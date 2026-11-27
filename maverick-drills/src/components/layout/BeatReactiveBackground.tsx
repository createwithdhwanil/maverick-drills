"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_SOURCE =
  "/public/audio/Unknown Brain - Superhero (feat. Chris Linton) Trap NCS - Copyright Free Music.mp3";
const DEFAULT_VOLUME = 0.4;

export default function BeatReactiveBackground() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number | null>(null);

  const playbackPendingRef = useRef(false);
  const mountedRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [error, setError] = useState<string | null>(null);

  const stopVisualizer = useCallback(() => {
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

  const startVisualizer = useCallback(() => {
    if (frameRef.current !== null) return;

    const analyser = analyserRef.current;
    const atmosphere = atmosphereRef.current;

    if (!analyser || !atmosphere) return;

    const frequencies = new Uint8Array(analyser.frequencyBinCount);

    let smoothBass = 0;
    let smoothEnergy = 0;
    let baseline = 0.12;
    let beatFlash = 0;
    let lastBeat = 0;

    function animate(time: number) {
      if (!analyser || !atmosphere) return;

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

      if (bass > 0.22 && bass > baseline * 1.32 && time - lastBeat > 220) {
        lastBeat = time;
        beatFlash = 1;
      }

      beatFlash *= 0.88;

      atmosphere.style.setProperty("--md-bass", smoothBass.toFixed(3));

      atmosphere.style.setProperty("--md-energy", smoothEnergy.toFixed(3));

      atmosphere.style.setProperty("--md-beat", beatFlash.toFixed(3));

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);
  }, []);

  const prepareAudioGraph = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      throw new Error("Audio element is unavailable.");
    }

    if (contextRef.current) {
      return contextRef.current;
    }

    const context = new AudioContext();
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

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio || playbackPendingRef.current) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    playbackPendingRef.current = true;
    setBusy(true);
    setError(null);

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    try {
      const context = prepareAudioGraph();

      // Start both operations from the click gesture.
      const resumePromise = context.resume();
      const playPromise = audio.play();

      // Prevent a permanently stuck loading button.
      const timeout = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error("Audio loading timed out. Check the MP3 response."));
        }, 8000);
      });

      await Promise.race([Promise.all([resumePromise, playPromise]), timeout]);

      if (mountedRef.current) {
        setPlaying(true);
        startVisualizer();
      }
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : "Unknown audio error";

      console.error("Maverick audio error:", caught);

      audio.pause();
      stopVisualizer();

      if (mountedRef.current) {
        setPlaying(false);
        setError(message);
        setExpanded(true);
      }
    } finally {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      playbackPendingRef.current = false;

      if (mountedRef.current) {
        setBusy(false);
      }
    }
  };

  function changeVolume(value: number) {
    const next = Math.min(1, Math.max(0, value));

    setVolume(next);

    if (audioRef.current) {
      audioRef.current.volume = next;
    }
  }

  useEffect(() => {
    mountedRef.current = true;

    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = DEFAULT_VOLUME;

    function onVisibilityChange() {
      if (document.hidden) {
        audio?.pause();
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      mountedRef.current = false;

      document.removeEventListener("visibilitychange", onVisibilityChange);

      audio.pause();

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      const context = contextRef.current;

      contextRef.current = null;
      analyserRef.current = null;

      if (context && context.state !== "closed") {
        void context.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      {/* GLOBAL REACTIVE BACKGROUND */}
      <div
        ref={atmosphereRef}
        className="md-beat-atmosphere"
        data-beat-active={playing}
        aria-hidden="true"
      >
        <div className="md-beat-atmosphere__grid" />

        <div className="md-beat-atmosphere__glow md-beat-atmosphere__glow--left" />

        <div className="md-beat-atmosphere__glow md-beat-atmosphere__glow--right" />

        <div className="md-beat-atmosphere__pulse" />

        <div className="md-beat-atmosphere__streak" />
      </div>

      {/* MUSIC */}
      <audio
        ref={audioRef}
        src={AUDIO_SOURCE}
        preload="metadata"
        loop
        onPlay={() => {
          setPlaying(true);
          startVisualizer();
        }}
        onPause={() => {
          setPlaying(false);
          stopVisualizer();
        }}
        onError={() => {
          setPlaying(false);
          stopVisualizer();

          setError("Unable to load the soundtrack. Check the MP3 file.");
        }}
      />

      {/* FLOATING AUDIO CONTROLS */}
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
                className="mt-3 font-body text-xs leading-relaxed text-red"
              >
                {error}
              </p>
            )}
          </div>
        )}

        <div className="md-sound-control__actions">
          <button
            type="button"
            aria-label="Music settings"
            aria-expanded={expanded}
            aria-controls="md-sound-settings"
            onClick={() => setExpanded((value) => !value)}
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
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 17h16" />
              <circle cx="9" cy="7" r="2" fill="#0B0D10" />
              <circle cx="16" cy="17" r="2" fill="#0B0D10" />
            </svg>
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={togglePlayback}
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
