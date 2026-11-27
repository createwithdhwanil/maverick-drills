"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_SOURCE = "/audio/background-music.mp3";
const DEFAULT_VOLUME = 0.4;
const AUDIO_TIMEOUT_MS = 15000;

// Change this between 1.5 and 3 to tune sensitivity.
const REACTIVITY = 2.2;

export default function BeatReactiveBackground() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number | null>(null);

  const mountedRef = useRef(false);
  const pendingRef = useRef(false);
  const runningRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [error, setError] = useState<string | null>(null);

  /* ==========================================
     RESET REACTIVE VARIABLES
  ========================================== */

  const resetAtmosphere = useCallback(() => {
    const element = atmosphereRef.current;

    if (!element) return;

    element.style.setProperty("--md-bass", "0");
    element.style.setProperty("--md-energy", "0");
    element.style.setProperty("--md-beat", "0");
    element.style.setProperty("--md-impact", "0");
  }, []);

  /* ==========================================
     STOP VISUALIZER
  ========================================== */

  const stopVisualizer = useCallback(() => {
    runningRef.current = false;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    resetAtmosphere();
  }, [resetAtmosphere]);

  /* ==========================================
     PREPARE WEB AUDIO GRAPH

     Creates one MediaElementAudioSourceNode
     for the soundtrack and connects it to:
       Audio -> Analyser -> Speakers
  ========================================== */

  const prepareAudioGraph = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      throw new Error("Audio element unavailable.");
    }

    if (contextRef.current) {
      return contextRef.current;
    }

    if (typeof window.AudioContext === "undefined") {
      return null;
    }

    const context = new AudioContext();

    try {
      const analyser = context.createAnalyser();

      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.6;

      const source = context.createMediaElementSource(audio);

      source.connect(analyser);
      analyser.connect(context.destination);

      contextRef.current = context;
      analyserRef.current = analyser;

      return context;
    } catch (error) {
      void context.close().catch(() => {});
      throw error;
    }
  }, []);

  /* ==========================================
     REAL AUDIO-REACTIVE VISUALIZER
  ========================================== */

  const startVisualizer = useCallback(() => {
    if (runningRef.current) return;

    const analyser = analyserRef.current;
    const atmosphere = atmosphereRef.current;
    const audio = audioRef.current;

    if (!analyser || !atmosphere || !audio) return;
    if (audio.paused || document.hidden) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      resetAtmosphere();
      return;
    }

    runningRef.current = true;

    const frequencies = new Uint8Array(analyser.frequencyBinCount);

    const sampleRate = analyser.context.sampleRate;

    const binForHz = (frequency: number) =>
      Math.max(
        1,
        Math.min(
          frequencies.length - 1,
          Math.round((frequency * analyser.fftSize) / sampleRate),
        ),
      );

    const bassStart = binForHz(35);
    const bassEnd = binForHz(170);

    const midStart = binForHz(170);
    const midEnd = binForHz(2500);

    function averageRange(start: number, end: number) {
      let total = 0;

      for (let index = start; index <= end; index++) {
        total += frequencies[index] ?? 0;
      }

      return total / (end - start + 1) / 255;
    }

    let smoothBass = 0;
    let smoothEnergy = 0;
    let averageBass = 0.08;
    let previousBass = 0;

    let beatFlash = 0;
    let lastBeatTime = -1000;
    let previousFrameTime = 0;

    function animate(time: number) {
      if (!runningRef.current) return;

      if (
        audio!.paused ||
        document.hidden ||
        analyser!.context.state !== "running"
      ) {
        stopVisualizer();
        return;
      }

      analyser!.getByteFrequencyData(frequencies);

      const rawBass = averageRange(bassStart, bassEnd);

      const rawEnergy = averageRange(midStart, midEnd);

      // Adapt to the current track's loudness.
      const deltaTime =
        previousFrameTime > 0 ? Math.min(time - previousFrameTime, 100) : 16.67;

      previousFrameTime = time;

      const frameScale = deltaTime / 16.67;

      const baselineAlpha = 1 - Math.pow(1 - 0.018, frameScale);

      averageBass += (rawBass - averageBass) * baselineAlpha;

      const bassRise = rawBass - previousBass;

      const beatDetected =
        rawBass > 0.1 &&
        ((rawBass > averageBass * 1.16 && bassRise > 0.02) ||
          bassRise > 0.075) &&
        time - lastBeatTime > 210;

      if (beatDetected) {
        lastBeatTime = time;
        beatFlash = 1;
      }

      // Strengthen quieter tracks without
      // requiring maximum volume.
      const bassTarget = Math.min(1, Math.pow(rawBass, 0.8) * REACTIVITY);

      const energyTarget = Math.min(1, Math.pow(rawEnergy, 0.85) * REACTIVITY);

      const bassBaseAlpha = bassTarget > smoothBass ? 0.42 : 0.15;

      const bassAlpha = 1 - Math.pow(1 - bassBaseAlpha, frameScale);

      const energyAlpha = 1 - Math.pow(1 - 0.2, frameScale);

      smoothBass += (bassTarget - smoothBass) * bassAlpha;

      smoothEnergy += (energyTarget - smoothEnergy) * energyAlpha;

      // Beat flash fades after each kick.
      beatFlash *= Math.pow(0.87, frameScale);

      const impact = Math.min(1, smoothBass * 0.5 + beatFlash * 0.85);

      atmosphere!.style.setProperty("--md-bass", smoothBass.toFixed(3));

      atmosphere!.style.setProperty("--md-energy", smoothEnergy.toFixed(3));

      atmosphere!.style.setProperty("--md-beat", beatFlash.toFixed(3));

      atmosphere!.style.setProperty("--md-impact", impact.toFixed(3));

      previousBass = rawBass;

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);
  }, [resetAtmosphere, stopVisualizer]);

  /* ==========================================
     START / PAUSE MUSIC
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
      // Create the graph once.
      // No await before initiating playback.
      const context = prepareAudioGraph();

      let resumePromise: Promise<void> | null = null;

      if (context) {
        resumePromise = context.resume();
      }

      const playPromise = audio.play();

      // Don't block music on visualizer startup.
      if (resumePromise) {
        void resumePromise
          .then(() => {
            if (mountedRef.current && !audio.paused) {
              startVisualizer();
            }
          })
          .catch((graphError) => {
            console.warn("Audio analysis unavailable:", graphError);
          });
      }

      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error("Music loading timed out. Check the audio file."));
        }, AUDIO_TIMEOUT_MS);
      });

      await Promise.race([playPromise, timeoutPromise]);

      if (mountedRef.current) {
        setPlaying(true);
        setBusy(false);

        if (context?.state === "running") {
          startVisualizer();
        }
      }
    } catch (caught) {
      const playbackError =
        caught instanceof Error ? caught : new Error("Unknown audio error.");

      console.error("Maverick music error:", playbackError);

      audio.pause();
      stopVisualizer();

      let message = playbackError.message;

      if (playbackError.name === "NotSupportedError") {
        message =
          "The browser cannot play this soundtrack. Check background-music.mp3.";
      } else if (playbackError.name === "NotAllowedError") {
        message = "The browser blocked playback. Please press Play again.";
      } else if (playbackError.name === "AbortError") {
        message = "Playback was interrupted. Please try again.";
      }

      if (mountedRef.current) {
        setPlaying(false);
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
     LIFECYCLE + ACCESSIBILITY
  ========================================== */

  useEffect(() => {
    mountedRef.current = true;

    const audio = audioRef.current;

    if (audio) {
      audio.volume = DEFAULT_VOLUME;
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        audio?.pause();
        stopVisualizer();
      }
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleMotionChange() {
      if (motionQuery.matches) {
        stopVisualizer();
      } else if (
        audio &&
        !audio.paused &&
        contextRef.current?.state === "running"
      ) {
        startVisualizer();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      mountedRef.current = false;

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      motionQuery.removeEventListener("change", handleMotionChange);

      audio?.pause();
      stopVisualizer();

      // Preserve the graph during React Strict Mode
      // effect replays in development.
    };
  }, [startVisualizer, stopVisualizer]);

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <>
      {/* GLOBAL MUSIC-REACTIVE BACKGROUND */}
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

        <div className="md-beat-atmosphere__shockwave" />

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

          console.error(
            "Maverick audio error:",
            mediaError?.code,
            mediaError?.message,
          );

          setError(
            mediaError?.message || "Unable to load background-music.mp3.",
          );

          setPlaying(false);
          setBusy(false);
          setExpanded(true);

          stopVisualizer();
        }}
      />

      {/* FLOATING MUSIC CONTROLS */}
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
              strokeLinejoin="round"
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
