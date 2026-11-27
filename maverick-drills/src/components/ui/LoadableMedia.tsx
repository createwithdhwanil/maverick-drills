"use client";

import {
  useEffect,
  useRef,
  useState,
  type IframeHTMLAttributes,
  type VideoHTMLAttributes,
} from "react";

import Image, { type ImageProps } from "next/image";

/* =====================================================
   MAVERICK DRILLS — LOADABLE MEDIA

   Exports:
   - LoadableImage
   - LoadableVideo
   - LoadableIframe
===================================================== */

/* =====================================================
   01 / LOADABLE IMAGE
===================================================== */

export function LoadableImage({
  className = "",
  onLoad,
  onError,
  ...props
}: ImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<ImageProps["src"] | null>(null);

  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);

  const currentSrc = props.src;

  const loaded = loadedSrc === currentSrc;
  const failed = failedSrc === currentSrc;

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
          setLoadedSrc(currentSrc);
          setFailedSrc(null);
          onLoad?.(event);
        }}
        onError={(event) => {
          setFailedSrc(currentSrc);
          onError?.(event);
        }}
      />
    </>
  );
}

/* =====================================================
   02 / LOADABLE VIDEO
===================================================== */

type LoadableVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  wrapperClassName?: string;
};

type VideoSource = NonNullable<VideoHTMLAttributes<HTMLVideoElement>["src"]>;

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

  // Correct source type:
  // string | Blob | MediaSource | MediaStream
  const [visibleSrc, setVisibleSrc] = useState<VideoSource | null>(null);

  const [readySrc, setReadySrc] = useState<VideoSource | null>(null);

  const [failedSrc, setFailedSrc] = useState<VideoSource | null>(null);

  const [retryCount, setRetryCount] = useState(0);

  const hasSource = src != null;

  const isNearViewport = hasSource && visibleSrc === src;

  const ready = hasSource && readySrc === src;

  const failed = hasSource && failedSrc === src;

  /* ==========================================
     LOAD VIDEO WHEN NEAR THE VIEWPORT
  ========================================== */

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element || src == null) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisibleSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisibleSrc(src);
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
  }, [src]);

  /* ==========================================
     INITIALIZE VIDEO LOADING
  ========================================== */

  useEffect(() => {
    if (!isNearViewport) return;

    const video = videoRef.current;

    if (!video) return;

    if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
      video.load();
    }
  }, [isNearViewport, src, retryCount]);

  /* ==========================================
     RETRY FAILED VIDEO
  ========================================== */

  function retryVideo() {
    const video = videoRef.current;

    if (!video) return;

    setFailedSrc(null);
    setReadySrc(null);
    setVisibleSrc(src ?? null);

    setRetryCount((count) => count + 1);

    video.load();
  }

  return (
    <div
      ref={wrapperRef}
      className={`
        group/video relative isolate
        aspect-video w-full
        overflow-hidden bg-[#08090C]
        ${wrapperClassName}
      `}
    >
      {/* ACTUAL VIDEO PLAYER */}
      <video
        {...props}
        key={typeof src === "string" ? src : undefined}
        ref={videoRef}
        src={src}
        preload={isNearViewport ? preload : "none"}
        playsInline={playsInline}
        controls={controls}
        className={`
          relative z-10 block
          h-full w-full
          bg-black object-contain
          ${className}
        `}
        onLoadedMetadata={(event) => {
          setReadySrc(src ?? null);
          setFailedSrc(null);
          onLoadedMetadata?.(event);
        }}
        onLoadedData={(event) => {
          setReadySrc(src ?? null);
          setFailedSrc(null);
          onLoadedData?.(event);
        }}
        onCanPlay={(event) => {
          setReadySrc(src ?? null);
          setFailedSrc(null);
          onCanPlay?.(event);
        }}
        onError={(event) => {
          setFailedSrc(src ?? null);
          setReadySrc(null);
          onError?.(event);
        }}
      />

      {/* NON-BLOCKING LOADING INDICATOR */}
      {!ready && !failed && hasSource && (
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-x-0 top-0 z-20
            flex justify-end p-3
          "
        >
          <span
            className="
              flex items-center gap-2
              border border-white/10
              bg-black/65 px-3 py-2
              font-body text-[10px]
              uppercase tracking-wider
              text-white/75 backdrop-blur-md
            "
          >
            <span
              className={`
                h-1.5 w-1.5
                rounded-full

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

      {/* ERROR FALLBACK */}
      {failed && (
        <div
          role="alert"
          className="
            absolute inset-0 z-30
            flex flex-col items-center
            justify-center
            bg-[#08090C]
            p-5 text-center
          "
        >
          <div
            aria-hidden="true"
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-full
              border border-red/40
              bg-red/10 text-red
            "
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
              text-xs uppercase text-white
            "
          >
            VIDEO UNAVAILABLE
          </p>

          <p
            className="
              mt-2 max-w-xs
              font-body text-xs
              leading-relaxed text-white/60
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

/* =====================================================
   03 / LOADABLE IFRAME
===================================================== */

type LoadableIframeProps = IframeHTMLAttributes<HTMLIFrameElement> & {
  wrapperClassName?: string;
};

export function LoadableIframe({
  wrapperClassName = "",
  className = "",
  loading = "lazy",
  onLoad,
  src,
  ...props
}: LoadableIframeProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  const loaded = src != null && loadedSrc === src;

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
        src={src}
        loading={loading}
        onLoad={(event) => {
          setLoadedSrc(src ?? null);
          onLoad?.(event);
        }}
        className={`
          absolute inset-0
          h-full w-full
          bg-black
          ${className}
        `}
      />
    </div>
  );
}
