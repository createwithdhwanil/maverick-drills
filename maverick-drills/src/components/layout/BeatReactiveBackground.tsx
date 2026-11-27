"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_SOURCE = "/audio/background-music.mp3";
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
      element.style.setProperty("--md-impact", "0");
    }
  }, []);

  /* ==========================================
     AUDIO REACTIVE ANIMATION
  ========================================== */

  const startVisualizer = useCallback(() => {
    if (visualizerRunningRef.current) return;

    const analyser = analyserRef.current;
    const atmosphere = atmosphereRef.current;

    if (!analyser || !atmosphere) return;

    // Respect visitors who prefer reduced motion.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    visualizerRunningRef.current = true;

    const frequencies = new Uint8Array(analyser.frequencyBinCount);

    // Increase for more visible reactions.
    const REACTIVITY = 1.8;

    let smoothBass = 0;
    let smoothEnergy = 0;
    let averageBass = 0.08;
    let previousBass = 0;
    let beatFlash = 0;
    let lastBeatTime = -1000;

    // Convert a frequency in Hz to an FFT bin.
    const binForHz = (hz: number) =>
      Math.max(
        1,
        Math.min(
          frequencies.length - 1,
          Math.round((hz * analyser.fftSize) / analyser.context.sampleRate),
        ),
      );

    const bassStart = binForHz(40);
    const bassEnd = binForHz(170);
    const midStart = binForHz(170);
    const midEnd = binForHz(2500);

    function averageRange(start: number, end: number) {
      let sum = 0;
      let count = 0;

      for (let i = start; i <= end; i++) {
        sum += frequencies[i] ?? 0;
        count++;
      }

      return count > 0 ? sum / count / 255 : 0;
    }

    function animate(time: number) {
      if (!visualizerRunningRef.current) return;

      analyser!.getByteFrequencyData(frequencies);

      const rawBass = averageRange(bassStart, bassEnd);

      const rawEnergy = averageRange(midStart, midEnd);

      // Dynamic baseline helps accommodate
      // different tracks and mastering levels.
      averageBass += (rawBass - averageBass) * 0.018;

      const bassRise = rawBass - previousBass;

      // Beat detection responds to sudden bass
      // transients instead of constant loudness.
      const beatDetected =
        rawBass > 0.12 &&
        ((rawBass > averageBass * 1.18 && bassRise > 0.025) ||
          bassRise > 0.09) &&
        time - lastBeatTime > 230;

      if (beatDetected) {
        lastBeatTime = time;
        beatFlash = 1;
      }

      // Fast attack, smooth release.
      const bassTarget = Math.min(1, rawBass * REACTIVITY);

      const energyTarget = Math.min(1, rawEnergy * REACTIVITY);

      smoothBass +=
        (bassTarget - smoothBass) * (bassTarget > smoothBass ? 0.42 : 0.16);

      smoothEnergy += (energyTarget - smoothEnergy) * 0.2;

      // Visible short-lived shockwave.
      beatFlash *= 0.88;

      atmosphere!.style.setProperty("--md-bass", smoothBass.toFixed(3));

      atmosphere!.style.setProperty("--md-energy", smoothEnergy.toFixed(3));

      atmosphere!.style.setProperty("--md-beat", beatFlash.toFixed(3));

      // Additional intensity variable for rings.
      atmosphere!.style.setProperty(
        "--md-impact",
        Math.min(1, smoothBass * 0.55 + beatFlash * 0.75).toFixed(3),
      );

      previousBass = rawBass;

      frameRef.current = requestAnimationFrame(animate);
    }

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
          "This audio format isn't supported. Check or re-encode ckmaveri-theme.mp3.";
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
        {/* Bass-driven shockwaves */}
        <div className="md-beat-atmosphere__shockwave" />

        {/* Additional red light bloom */}
        <div className="md-beat-atmosphere__core" />
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
