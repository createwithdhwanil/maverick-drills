"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

import Image, { type ImageProps } from "next/image";

/* ==========================================
   LOADABLE IMAGE
========================================== */

export function LoadableImage({
  className = "",
  onLoad,
  onError,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <>
      {!loaded && !failed && (
        <div
          aria-hidden="true"
          className="
            skeleton-shimmer
            pointer-events-none
            absolute inset-0
          "
        />
      )}

      <Image
        {...props}
        className={`
          transition-opacity duration-500
          motion-reduce:transition-none
          ${loaded || failed ? "opacity-100" : "opacity-0"}
          ${className}
        `}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setFailed(true);
          onError?.(event);
        }}
      />
    </>
  );
}

/* ==========================================
   LOADABLE VIDEO
========================================== */

type LoadableVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  wrapperClassName?: string;
};

export function LoadableVideo({
  wrapperClassName = "",
  className = "",
  preload = "metadata",
  playsInline = true,
  controls = true,
  onLoadedMetadata,
  onLoadedData,
  onCanPlay,
  onError,
  src,
  ...props
}: LoadableVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isNearViewport, setIsNearViewport] = useState(false);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  /* ========================================
     LOAD MEDIA NEAR THE VIEWPORT
  ======================================== */

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "400px 0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* ========================================
     RETRY FAILED VIDEO
  ======================================== */

  function retryVideo() {
    const video = videoRef.current;

    if (!video) return;

    setFailed(false);
    setReady(false);
    setRetryCount((count) => count + 1);
    setIsNearViewport(true);

    video.load();
  }

  const effectivePreload = isNearViewport ? preload : "none";

  return (
    <div
      ref={wrapperRef}
      className={`
        group/video
        relative isolate
        aspect-video w-full
        overflow-hidden bg-[#08090C]
        ${wrapperClassName}
      `}
    >
      {/* ====================================
          ACTUAL VIDEO PLAYER
      ==================================== */}

      <video
        {...props}
        key={src}
        ref={videoRef}
        src={src}
        preload={effectivePreload}
        playsInline={playsInline}
        controls={controls}
        className={`
          relative z-10
          block h-full w-full
          bg-black object-contain
          ${className}
        `}
        onLoadedMetadata={(event) => {
          setReady(true);
          setFailed(false);
          onLoadedMetadata?.(event);
        }}
        onLoadedData={(event) => {
          setReady(true);
          setFailed(false);
          onLoadedData?.(event);
        }}
        onCanPlay={(event) => {
          setReady(true);
          setFailed(false);
          onCanPlay?.(event);
        }}
        onError={(event) => {
          setFailed(true);
          setReady(false);
          onError?.(event);
        }}
      />

      {/* ====================================
          LOADING STATE
          Does not block video controls.
      ==================================== */}

      {!ready && !failed && (
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-x-0 top-0
            z-20 flex items-start
            justify-end p-3
          "
        >
          <span
            className="
              flex items-center gap-2
              border border-white/10
              bg-black/65
              px-3 py-2

              font-body text-[10px]
              uppercase tracking-wider
              text-white/75
              backdrop-blur-md
            "
          >
            <span
              className={`
                h-1.5 w-1.5 rounded-full
                ${
                  isNearViewport
                    ? "animate-pulse bg-red motion-reduce:animate-none"
                    : "bg-white/40"
                }
              `}
            />

            {isNearViewport ? "LOADING VIDEO" : "VIDEO PREVIEW"}
          </span>
        </div>
      )}

      {/* ====================================
          ERROR FALLBACK
      ==================================== */}

      {failed && (
        <div
          role="alert"
          className="
            absolute inset-0 z-30
            flex flex-col
            items-center justify-center
            bg-[#08090C] p-5
            text-center
          "
        >
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-full

              border border-red/40
              bg-red/10
              text-red
            "
            aria-hidden="true"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v6" />
              <path d="M12 17h.01" />
            </svg>
          </div>

          <p
            className="
              mt-3 font-heading
              text-xs uppercase
              text-white
            "
          >
            VIDEO UNAVAILABLE
          </p>

          <p
            className="
              mt-2 max-w-xs
              font-body text-xs
              leading-relaxed
              text-white/60
            "
          >
            This clip could not be loaded. Please try again.
          </p>

          <button
            type="button"
            onClick={retryVideo}
            className="
              mt-4 min-h-10
              border border-red
              bg-red px-5 py-2

              font-heading text-[10px]
              uppercase text-white

              transition-colors
              hover:bg-red-deep
            "
          >
            RETRY VIDEO
          </button>

          <span className="sr-only">Retry attempt {retryCount}</span>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   LOADABLE IFRAME
   YouTube embeds remain compatible.
========================================== */

export function LoadableIframe({
  wrapperClassName = "",
  className = "",
  loading = "lazy",
  onLoad,
  ...props
}: React.IframeHTMLAttributes<HTMLIFrameElement> & {
  wrapperClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`
        relative overflow-hidden
        ${wrapperClassName}
      `}
    >
      {!loaded && (
        <div
          aria-hidden="true"
          className="
            skeleton-shimmer
            pointer-events-none
            absolute inset-0
          "
        />
      )}

      <iframe
        {...props}
        loading={loading}
        className={`
          absolute inset-0
          h-full w-full

          transition-opacity duration-500
          motion-reduce:transition-none

          ${loaded ? "opacity-100" : "opacity-0"}

          ${className}
        `}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </div>
  );
}
