"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_SOURCE = "/audio/maverick-theme.mp3";
const INITIAL_VOLUME = 0.4;

export default function BeatReactiveBackground() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(INITIAL_VOLUME);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const startVisualizer = useCallback(() => {
    if (frameRef.current !== null) return;

    const analyser = analyserRef.current;
    const atmosphere = atmosphereRef.current;

    if (!analyser || !atmosphere) return;

    const data = new Uint8Array(analyser.frequencyBinCount);

    let smoothBass = 0;
    let smoothEnergy = 0;
    let baseline = 0.12;
    let lastBeat = 0;
    let beatFlash = 0;

    function animate(time: number) {
      if (!analyser || !atmosphere) return;

      analyser.getByteFrequencyData(data);

      // FFT size is 1024. Low bins hold most
      // kick and bass energy for typical music.
      let bassSum = 0;
      let bassCount = 0;

      for (let index = 1; index <= 6; index++) {
        bassSum += data[index] ?? 0;
        bassCount++;
      }

      let energySum = 0;
      let energyCount = 0;

      for (let index = 7; index <= 65; index++) {
        energySum += data[index] ?? 0;
        energyCount++;
      }

      const bass = bassSum / Math.max(1, bassCount) / 255;

      const energy = energySum / Math.max(1, energyCount) / 255;

      smoothBass += (bass - smoothBass) * 0.18;
      smoothEnergy += (energy - smoothEnergy) * 0.14;

      // Maintain a rolling baseline to detect
      // bass transients, rather than only volume.
      baseline += (bass - baseline) * 0.015;

      const isBeat =
        bass > 0.22 && bass > baseline * 1.32 && time - lastBeat > 220;

      if (isBeat) {
        lastBeat = time;
        beatFlash = 1;
      }

      beatFlash *= 0.88;

      atmosphere.style.setProperty("--md-bass", smoothBass.toFixed(3));

      atmosphere.style.setProperty("--md-energy", smoothEnergy.toFixed(3));

      atmosphere.style.setProperty("--md-beat", beatFlash.toFixed(3));

      frameRef.current = window.requestAnimationFrame(animate);
    }

    frameRef.current = window.requestAnimationFrame(animate);
  }, []);

  const stopVisualizer = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    const atmosphere = atmosphereRef.current;

    atmosphere?.style.setProperty("--md-bass", "0");
    atmosphere?.style.setProperty("--md-energy", "0");
    atmosphere?.style.setProperty("--md-beat", "0");
  }, []);

  function prepareAudioGraph() {
    const audio = audioRef.current;

    if (!audio) return null;

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
  }

  async function togglePlayback() {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      setError(false);

      const context = prepareAudioGraph();

      if (!context) return;

      // Both operations are initiated by the
      // user's Play click.
      await Promise.all([context.resume(), audio.play()]);
    } catch (playbackError) {
      console.error("Maverick audio playback failed:", playbackError);

      audio.pause();
      setError(true);
      setPlaying(false);
      stopVisualizer();
    }
  }

  function changeVolume(next: number) {
    const clamped = Math.min(1, Math.max(0, next));

    setVolume(clamped);

    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  }

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = INITIAL_VOLUME;

    const onVisibilityChange = () => {
      if (document.hidden) {
        audio.pause();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);

      audio.pause();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = null;

      const context = contextRef.current;
      contextRef.current = null;
      analyserRef.current = null;

      if (context) {
        void context.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      {/* Decorative, non-interactive background */}
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

      <audio
        ref={audioRef}
        src={AUDIO_SOURCE}
        preload="none"
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
          setError(true);
          setPlaying(false);
          stopVisualizer();
        }}
      />

      {/* Global music control */}
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
                Couldn't load the soundtrack. Check
                public/audio/maverick-theme.mp3.
              </p>
            )}
          </div>
        )}

        <div className="md-sound-control__actions">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-label="Music settings"
            aria-expanded={expanded}
            aria-controls="md-sound-settings"
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
            onClick={togglePlayback}
            aria-label={
              playing ? "Pause background music" : "Play background music"
            }
            aria-pressed={playing}
            className={`md-sound-control__play ${playing ? "is-playing" : ""}`}
          >
            <span aria-hidden="true" className="md-sound-control__indicator" />

            <span>{playing ? "SOUND ON" : "SOUND OFF"}</span>

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
