"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_SOURCE =
  "/public/audio/Unknown Brain - Superhero (feat. Chris Linton) Trap NCS - Copyright Free Music.mp3";
const DEFAULT_VOLUME = 0.4;

const AUDIO_TIMEOUT_MS = 15000;

export default function BeatReactiveBackground() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number | null>(null);

  const pendingRef = useRef(false);
  const mountedRef = useRef(false);
  const visualizerRunningRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [error, setError] = useState<string | null>(null);

  /* ==========================================
     VISUALIZER RESET
  ========================================== */

  const stopVisualizer = useCallback(() => {
    visualizerRunningRef.current = false;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    const element = atmosphereRef.current;

    if (element) {
      element.style.setProperty("--md-bass", "0");
      element.style.setProperty("--md-energy", "0");
      element.style.setProperty("--md-beat", "0");
    }
  }, []);

  /* ==========================================
     WEB AUDIO ANALYSER
  ========================================== */

  const prepareAudioGraph = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return null;

    if (contextRef.current) {
      return contextRef.current;
    }

    const AudioContextClass = window.AudioContext;

    if (!AudioContextClass) {
      return null;
    }

    const context = new AudioContextClass();

    const analyser = context.createAnalyser();

    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.76;

    const source = context.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(context.destination);

    contextRef.current = context;
    analyserRef.current = analyser;

    return context;
  }, []);

  /* ==========================================
     AUDIO REACTIVE ANIMATION
  ========================================== */

  const startVisualizer = useCallback(() => {
    if (visualizerRunningRef.current) return;

    const analyser = analyserRef.current;
    const atmosphere = atmosphereRef.current;

    if (!analyser || !atmosphere) return;

    visualizerRunningRef.current = true;

    const frequencies = new Uint8Array(analyser.frequencyBinCount);

    let smoothBass = 0;
    let smoothEnergy = 0;
    let baseline = 0.1;
    let beatFlash = 0;
    let lastBeat = 0;

    const animate = (time: number) => {
      if (!visualizerRunningRef.current) return;

      analyser.getByteFrequencyData(frequencies);

      let bassTotal = 0;
      let energyTotal = 0;

      for (let i = 1; i <= 6; i++) {
        bassTotal += frequencies[i] ?? 0;
      }

      for (let i = 7; i <= 65; i++) {
        energyTotal += frequencies[i] ?? 0;
      }

      const bass = bassTotal / 6 / 255;
      const energy = energyTotal / 59 / 255;

      smoothBass += (bass - smoothBass) * 0.18;
      smoothEnergy += (energy - smoothEnergy) * 0.14;

      baseline += (bass - baseline) * 0.015;

      const beatDetected =
        bass > 0.2 && bass > baseline * 1.25 && time - lastBeat > 230;

      if (beatDetected) {
        lastBeat = time;
        beatFlash = 1;
      }

      beatFlash *= 0.87;

      atmosphere.style.setProperty("--md-bass", smoothBass.toFixed(3));

      atmosphere.style.setProperty("--md-energy", smoothEnergy.toFixed(3));

      atmosphere.style.setProperty("--md-beat", beatFlash.toFixed(3));

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
  }, []);

  /* ==========================================
     START PLAYBACK
  ========================================== */

  async function togglePlayback() {
    const audio = audioRef.current;

    if (!audio || pendingRef.current) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    pendingRef.current = true;

    setBusy(true);
    setError(null);

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    try {
      // Start playback directly from the click.
      // Do not wait for AudioContext.resume().
      const playPromise = audio.play();

      // Set up the analyser after initiating playback,
      // while still inside the user interaction.
      let resumePromise: Promise<void> | null = null;

      try {
        const context = prepareAudioGraph();

        if (context) {
          resumePromise = context.resume();
        }
      } catch (graphError) {
        // Audio can still be played even if the
        // visualizer isn't available.
        console.warn("Audio visualizer unavailable:", graphError);
      }

      // Don't let a stalled network request keep
      // the control in LOADING indefinitely.
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(
            new Error("Soundtrack loading timed out. Verify the MP3 file."),
          );
        }, AUDIO_TIMEOUT_MS);
      });

      // Only wait for actual media playback.
      await Promise.race([playPromise, timeoutPromise]);

      if (!mountedRef.current) return;

      setPlaying(true);
      setBusy(false);

      // Resume analysis without blocking playback.
      if (resumePromise) {
        void resumePromise
          .then(() => {
            if (mountedRef.current && !audio.paused) {
              startVisualizer();
            }
          })
          .catch((graphError) => {
            console.warn("Audio analysis could not start:", graphError);
          });
      }
    } catch (caught) {
      const playbackError =
        caught instanceof Error ? caught : new Error("Unknown audio error");

      console.error("Maverick audio playback failed:", playbackError);

      audio.pause();
      stopVisualizer();

      let message = playbackError.message;

      if (playbackError.name === "NotSupportedError") {
        message =
          "This audio format isn't supported. Check or re-encode maverick-theme.mp3.";
      } else if (playbackError.name === "NotAllowedError") {
        message = "Browser blocked playback. Please press Play again.";
      } else if (playbackError.name === "AbortError") {
        message = "Audio playback was interrupted. Try again.";
      }

      if (mountedRef.current) {
        setPlaying(false);
        setBusy(false);
        setError(message);
        setExpanded(true);
      }
    } finally {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      pendingRef.current = false;

      if (mountedRef.current) {
        setBusy(false);
      }
    }
  }

  /* ==========================================
     VOLUME
  ========================================== */

  function changeVolume(value: number) {
    const next = Math.max(0, Math.min(1, value));

    setVolume(next);

    if (audioRef.current) {
      audioRef.current.volume = next;
    }
  }

  /* ==========================================
     LIFECYCLE
  ========================================== */

  useEffect(() => {
    mountedRef.current = true;

    const audio = audioRef.current;

    if (audio) {
      audio.volume = DEFAULT_VOLUME;
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        audio?.pause();
        stopVisualizer();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      mountedRef.current = false;

      document.removeEventListener("visibilitychange", onVisibilityChange);

      audio?.pause();
      stopVisualizer();

      // Keep the existing AudioContext reference here.
      // Closing and recreating it during React Strict
      // Mode effect replays can break MediaElementSource.
      // The browser releases it when the page unloads.
    };
  }, [stopVisualizer]);

  /* ==========================================
     UI
  ========================================== */

  return (
    <>
      {/* GLOBAL MUSIC REACTIVE BACKGROUND */}
      <div
        ref={atmosphereRef}
        aria-hidden="true"
        data-beat-active={playing}
        className="md-beat-atmosphere"
      >
        <div className="md-beat-atmosphere__grid" />

        <div className="md-beat-atmosphere__glow md-beat-atmosphere__glow--left" />

        <div className="md-beat-atmosphere__glow md-beat-atmosphere__glow--right" />

        <div className="md-beat-atmosphere__pulse" />

        <div className="md-beat-atmosphere__streak" />
      </div>

      {/* SOUNDTRACK */}
      <audio
        ref={audioRef}
        src={AUDIO_SOURCE}
        preload="none"
        loop
        onPlaying={() => {
          setPlaying(true);
          setBusy(false);

          if (contextRef.current?.state === "running") {
            startVisualizer();
          }
        }}
        onPause={() => {
          setPlaying(false);
          stopVisualizer();
        }}
        onEnded={() => {
          setPlaying(false);
          stopVisualizer();
        }}
        onError={(event) => {
          const mediaError = event.currentTarget.error;

          const message =
            mediaError?.message || "The soundtrack could not be loaded.";

          console.error("Maverick media error:", mediaError?.code, message);

          setError(message);
          setBusy(false);
          setPlaying(false);
          setExpanded(true);

          stopVisualizer();
        }}
      />

      {/* FLOATING MUSIC PLAYER */}
      <div className="md-sound-control">
        {expanded && (
          <div id="md-sound-settings" className="md-sound-control__panel">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-heading text-[10px] uppercase tracking-wider text-red">
                  MAVERICK AUDIO
                </p>

                <p className="mt-1 font-body text-xs text-white/70">
                  Cinematic sound system
                </p>
              </div>

              <span
                aria-hidden="true"
                className={`md-sound-bars ${
                  playing ? "md-sound-bars--playing" : ""
                }`}
              >
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>

            <label
              htmlFor="md-volume"
              className="mt-5 block font-body text-xs text-white/70"
            >
              Volume: {Math.round(volume * 100)}%
            </label>

            <input
              id="md-volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(event) => changeVolume(Number(event.target.value))}
              className="mt-2 w-full accent-[#E50924]"
            />

            {error && (
              <p
                role="alert"
                className="mt-4 border-l-2 border-red pl-3 font-body text-xs leading-relaxed text-white/75"
              >
                {error}
              </p>
            )}
          </div>
        )}

        <div className="md-sound-control__actions">
          {/* SETTINGS */}
          <button
            type="button"
            onClick={() => setExpanded((previous) => !previous)}
            aria-label="Music settings"
            aria-expanded={expanded}
            aria-controls={expanded ? "md-sound-settings" : undefined}
            className="md-sound-control__settings"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 17h16" />
              <circle cx="9" cy="7" r="2" fill="#0B0D10" />
              <circle cx="16" cy="17" r="2" fill="#0B0D10" />
            </svg>
          </button>

          {/* PLAY / PAUSE */}
          <button
            type="button"
            onClick={togglePlayback}
            disabled={busy}
            aria-label={
              playing ? "Pause background music" : "Play background music"
            }
            aria-pressed={playing}
            className={`md-sound-control__play ${playing ? "is-playing" : ""}`}
          >
            <span aria-hidden="true" className="md-sound-control__indicator" />

            <span>{busy ? "LOADING" : playing ? "SOUND ON" : "SOUND OFF"}</span>

            <span
              aria-hidden="true"
              className={`md-sound-bars ${
                playing ? "md-sound-bars--playing" : ""
              }`}
            >
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
