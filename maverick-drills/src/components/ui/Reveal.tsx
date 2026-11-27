"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.1,
        margin: "0px 0px -20px 0px",
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        delay: reduceMotion ? 0 : delay / 1000,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
