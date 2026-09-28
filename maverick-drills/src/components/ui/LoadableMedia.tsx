"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

export function LoadableImage({ className = "", ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div
        aria-hidden="true"
        className={`skeleton-shimmer absolute inset-0 transition-opacity duration-500 ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      />
      <Image
        {...props}
        className={`transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={(event) => {
          setLoaded(true);
          props.onLoad?.(event);
        }}
      />
    </>
  );
}

export function LoadableVideo({
  wrapperClassName = "",
  className = "",
  ...props
}: React.VideoHTMLAttributes<HTMLVideoElement> & {
  wrapperClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative min-h-[160px] overflow-hidden ${wrapperClassName}`}
    >
      <div
        aria-hidden="true"
        className={`skeleton-shimmer absolute inset-0 transition-opacity duration-500 ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      />
      <video
        {...props}
        className={`w-full transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoadedData={(event) => {
          setLoaded(true);
          props.onLoadedData?.(event);
        }}
      />
    </div>
  );
}

export function LoadableIframe({
  wrapperClassName = "",
  className = "",
  ...props
}: React.IframeHTMLAttributes<HTMLIFrameElement> & {
  wrapperClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      <div
        aria-hidden="true"
        className={`skeleton-shimmer absolute inset-0 transition-opacity duration-500 ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      />
      <iframe
        {...props}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={(event) => {
          setLoaded(true);
          props.onLoad?.(event);
        }}
      />
    </div>
  );
}
