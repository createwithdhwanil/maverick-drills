"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";

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

  const [active, setActive] = useState(false);

  // Pointer coordinates for reactive lighting.
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  // Target rotation.
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  const rotateX = useSpring(targetX, {
    stiffness: 180,
    damping: 24,
    mass: 0.7,
  });

  const rotateY = useSpring(targetY, {
    stiffness: 180,
    damping: 24,
    mass: 0.7,
  });

  const targetLift = useMotionValue(0);

  const lift = useSpring(targetLift, {
    stiffness: 220,
    damping: 26,
  });

  const targetOpacity = useMotionValue(0);

  const glowOpacity = useSpring(targetOpacity, {
    stiffness: 180,
    damping: 28,
  });

  const spotlight = useMotionTemplate`
    radial-gradient(
      350px circle at ${pointerX}% ${pointerY}%,
      rgba(229, 9, 36, 0.2),
      transparent 65%
    )
  `;

  function canTilt(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return false;

    if (event.pointerType !== "mouse") {
      return false;
    }

    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (!canTilt(event)) return;

    setActive(true);
    targetLift.set(-4);
    targetOpacity.set(glow ? 1 : 0);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!canTilt(event)) return;

    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect || !rect.width || !rect.height) {
      return;
    }

    const x = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width),
    );

    const y = Math.max(
      0,
      Math.min(1, (event.clientY - rect.top) / rect.height),
    );

    pointerX.set(x * 100);
    pointerY.set(y * 100);

    targetX.set((0.5 - y) * maxTilt * 2);
    targetY.set((x - 0.5) * maxTilt * 2);
  }

  function resetCard() {
    targetX.set(0);
    targetY.set(0);
    targetLift.set(0);
    targetOpacity.set(0);
    setActive(false);
  }

  return (
    <div
      className={`
        relative h-full min-w-0
        ${className}
      `}
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
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          y: reduceMotion ? 0 : lift,
          transformStyle: "preserve-3d",
          willChange: active ? "transform" : "auto",
        }}
        className="
          relative h-full min-w-0 w-full
        "
      >
        {children}

        {glow && (
          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0 z-20
              clip-corner
            "
            style={{
              background: spotlight,
              opacity: reduceMotion ? 0 : glowOpacity,
            }}
          />
        )}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0 z-30
            clip-corner
            border border-white/10

            transition-colors duration-300
            motion-reduce:transition-none
          "
        />
      </motion.div>
    </div>
  );
}
