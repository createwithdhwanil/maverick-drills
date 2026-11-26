"use client";

import {
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

type PremiumTiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glow?: boolean;
};

export default function PremiumTiltCard({
  children,
  className = "",
  maxTilt = 6,
  glow = true,
}: PremiumTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Raw cursor positions
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  // Tilt targets
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Smooth spring physics
  const rotateX = useSpring(tiltX, {
    stiffness: 180,
    damping: 24,
    mass: 0.7,
  });

  const rotateY = useSpring(tiltY, {
    stiffness: 180,
    damping: 24,
    mass: 0.7,
  });

  const liftTarget = useMotionValue(0);

  const lift = useSpring(liftTarget, {
    stiffness: 220,
    damping: 26,
  });

  const spotlightOpacity = useMotionValue(0);

  const glowOpacity = useSpring(spotlightOpacity, {
    stiffness: 180,
    damping: 28,
  });

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      350px circle at ${pointerX}% ${pointerY}%,
      rgba(229, 9, 36, 0.22),
      transparent 65%
    )
  `;

  function canAnimate(event: PointerEvent<HTMLDivElement>) {
    return (
      !reduceMotion &&
      event.pointerType === "mouse" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!canAnimate(event)) return;

    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect || !rect.width || !rect.height) {
      return;
    }

    const x = (event.clientX - rect.left) / rect.width;

    const y = (event.clientY - rect.top) / rect.height;

    const clampedX = Math.max(0, Math.min(1, x));

    const clampedY = Math.max(0, Math.min(1, y));

    pointerX.set(clampedX * 100);
    pointerY.set(clampedY * 100);

    tiltX.set((0.5 - clampedY) * maxTilt * 2);

    tiltY.set((clampedX - 0.5) * maxTilt * 2);
  }

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (!canAnimate(event)) return;

    liftTarget.set(-5);
    spotlightOpacity.set(1);
  }

  function resetCard() {
    tiltX.set(0);
    tiltY.set(0);
    liftTarget.set(0);
    spotlightOpacity.set(0);
  }

  const cardStyle = {
    rotateX: reduceMotion ? 0 : rotateX,
    rotateY: reduceMotion ? 0 : rotateY,
    y: reduceMotion ? 0 : lift,
    transformStyle: "preserve-3d",
  } satisfies CSSProperties | Record<string, unknown>;

  return (
    <div
      className={`relative h-full min-w-0 ${className}`}
      style={{
        perspective: "1200px",
      }}
    >
      <motion.div
        ref={cardRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetCard}
        onPointerCancel={resetCard}
        style={cardStyle}
        className="
          relative h-full w-full
          min-w-0 transform-gpu
          will-change-transform
        "
      >
        {children}

        {/* Cursor-reactive red light */}
        {glow && (
          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0 z-20
              clip-corner
            "
            style={{
              background: spotlightBackground,
              opacity: reduceMotion ? 0 : glowOpacity,
            }}
          />
        )}

        {/* Thin premium border */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0 z-30
            clip-corner
            border border-white/10
            transition-colors duration-300
            group-hover:border-red/40
          "
        />
      </motion.div>
    </div>
  );
}
