"use client";

import { useRef } from "react";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { LoadableImage } from "@/components/ui/LoadableMedia";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";

type AboutExperienceProps = {
  images: string[];
  video: {
    title: string;
    url: string;
    thumbnail: string;
  } | null;
};

const YOUTUBE_URL = "https://www.youtube.com/@maverickdrillsog";

const INSTAGRAM_URL = "https://www.instagram.com/maverickdrills/";

const CONTACT_EMAIL = "dcgaming181@gmail.com";

const EASE = [0.22, 1, 0.36, 1] as const;

const experiences = [
  {
    number: "01",
    title: "ORIGINALS",
    eyebrow: "WATCH THE MOMENTS",
    description:
      "Gameplay edits, original videos, and unforgettable gaming moments from the Maverick Drills channel.",
    href: "/originals",
    action: "DISCOVER ORIGINALS",
  },
  {
    number: "02",
    title: "THE GALLERY",
    eyebrow: "CAPTURE THE WORLD",
    description:
      "A curated visual archive of gaming worlds, cinematic screenshots, and moments worth preserving.",
    href: "/gallery",
    action: "EXPLORE THE GALLERY",
  },
  {
    number: "03",
    title: "MONTHLY PICKS",
    eyebrow: "DISCOVER WHAT'S NEXT",
    description:
      "A selection of games worth your attention, chosen for their worlds, experiences, and memorable moments.",
    href: "/recommendations",
    action: "EXPLORE THE PICKS",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-8 shrink-0 bg-red" />
      <p
        className="
          font-heading text-[10px] uppercase
          tracking-[0.16em] text-red
          sm:text-xs
        "
      >
        {children}
      </p>
    </div>
  );
}

function MotionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.75,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutExperience({
  images,
  video,
}: AboutExperienceProps) {
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();

  const heroImage = images[0] || "/images/games/spiderman-miles-morales.jpg";

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(heroProgress, [0, 1], [0, 130]);

  const heroTextY = useTransform(heroProgress, [0, 1], [0, -35]);

  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.25]);

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });

  const storyImageY = useTransform(storyProgress, [0, 1], [-35, 35]);

  return (
    <main className="overflow-x-clip bg-background">
      {/* =====================================
          01 / CINEMATIC HERO
      ===================================== */}
      <section
        ref={heroRef}
        className="
          relative isolate flex
          min-h-[640px] items-center
          overflow-hidden border-b border-border

          sm:min-h-[720px]
          lg:min-h-[780px]
          min-[2000px]:min-h-[860px]
        "
      >
        {/* PARALLAX GAME ARTWORK */}
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -inset-y-20 inset-x-0
            z-0 overflow-hidden
          "
          style={{
            y: reduceMotion ? 0 : heroImageY,
          }}
        >
          <LoadableImage
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="
              object-cover object-center
              opacity-55
            "
          />
        </motion.div>

        {/* DARK GRADIENTS */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-[1]
            bg-gradient-to-r
            from-background
            via-background/80
            to-background/35
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-[1]
            bg-gradient-to-t
            from-background
            via-transparent
            to-background/30
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-[1]
            bg-[radial-gradient(ellipse_at_80%_40%,rgba(229,9,36,0.12),transparent_60%)]
          "
        />

        {/* HERO CONTENT */}
        <motion.div
          className="
            relative z-10 mx-auto w-full
            max-w-7xl px-5 py-28

            sm:px-8
            lg:px-12

            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
            min-[2000px]:px-16
          "
          style={{
            y: reduceMotion ? 0 : heroTextY,
            opacity: reduceMotion ? 1 : heroOpacity,
          }}
        >
          <div className="max-w-[950px]">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                ease: EASE,
              }}
            >
              <SectionLabel>THE STORY / MAVERICK DRILLS</SectionLabel>
            </motion.div>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.95,
                delay: reduceMotion ? 0 : 0.12,
                ease: EASE,
              }}
              className="
                mt-8 font-display
                text-[clamp(3.2rem,8vw,9rem)]
                uppercase leading-[0.88]
                tracking-[-0.065em]
                text-white
                [text-shadow:0_5px_35px_rgba(0,0,0,0.55)]
              "
            >
              BEYOND
              <span className="block">THE</span>
              <span className="block text-red">GAME.</span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : 0.3,
                ease: EASE,
              }}
              className="
                mt-8 max-w-xl
                font-body text-sm
                leading-relaxed
                text-white/80
                sm:text-base lg:text-lg
              "
            >
              A gaming brand built around creativity, precision, and the moments
              that stay with you long after the game is over.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : 0.42,
                ease: EASE,
              }}
              className="
                mt-9 flex flex-wrap gap-3
              "
            >
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  cinematic-button
                  inline-flex min-h-12
                  items-center gap-3
                  clip-corner-sm
                  bg-red px-6 py-3
                  font-heading text-xs
                  uppercase text-white
                  transition-colors
                  hover:bg-red-deep
                "
              >
                WATCH THE CHANNEL
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href="#our-story"
                className="
                  inline-flex min-h-12
                  items-center gap-3
                  clip-corner-sm
                  border border-white/30
                  bg-black/30 px-6 py-3
                  font-heading text-xs
                  uppercase text-white
                  backdrop-blur-md
                  transition-colors
                  hover:border-red
                "
              >
                DISCOVER OUR STORY
                <span aria-hidden="true">↓</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* VERTICAL SIDE LABEL */}
        <div
          aria-hidden="true"
          className="
            absolute bottom-16 right-6 z-10
            hidden font-body text-[10px]
            uppercase tracking-[0.25em]
            text-white/45
            [writing-mode:vertical-rl]
            lg:block
          "
        >
          PRECISION / CREATIVITY / COMMUNITY
        </div>
      </section>

      {/* =====================================
          02 / BRAND PHILOSOPHY
      ===================================== */}
      <section
        id="our-story"
        ref={storyRef}
        className="
          relative overflow-hidden
          border-b border-border
          bg-background
          scroll-mt-20
        "
      >
        <div
          className="
            mx-auto grid max-w-7xl
            items-center gap-14
            px-5 py-24

            sm:px-8
            lg:grid-cols-2
            lg:gap-20 lg:px-12
            lg:py-32

            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
            min-[2000px]:px-16
          "
        >
          <div>
            <MotionReveal>
              <SectionLabel>01 / THE PHILOSOPHY</SectionLabel>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2
                className="
                  mt-6 font-display
                  text-[clamp(2.5rem,5vw,5rem)]
                  uppercase leading-[0.98]
                  tracking-[-0.055em]
                  text-white
                "
              >
                EVERY FRAME
                <span className="block text-red">MATTERS.</span>
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.18}>
              <p
                className="
                  mt-8 font-body text-base
                  leading-8 text-white/75
                  sm:text-lg
                "
              >
                When precision fuses with creativity, practice stops being
                repetition and becomes revelation. Gameplay is no longer just
                movement on a screen — it becomes rhythm, tension, and emotion
                unfolding frame by frame.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p
                className="
                  mt-6 font-body text-base
                  leading-8 text-white/65
                "
              >
                At Maverick Drills, mastery isn&apos;t defined solely by skill
                or victory. It&apos;s about capturing a fleeting moment and
                turning it into something unforgettable.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <div
                className="
                  mt-9 border-l-2
                  border-red pl-5
                "
              >
                <p
                  className="
                    font-heading text-sm
                    uppercase leading-relaxed
                    text-white
                    sm:text-base
                  "
                >
                  EVERY DRILL SHARPENS CONTROL. EVERY MOMENT HAS THE POTENTIAL
                  TO BECOME CINEMATIC.
                </p>
              </div>
            </MotionReveal>
          </div>

          {/* CINEMATIC IMAGE */}
          <MotionReveal className="min-w-0">
            <div
              className="
                relative aspect-[4/5]
                overflow-hidden
                border border-white/10
                bg-surface
                sm:aspect-[5/4]
                lg:aspect-[4/5]
              "
            >
              <motion.div
                className="
                  absolute -inset-y-12 inset-x-0
                "
                style={{
                  y: reduceMotion ? 0 : storyImageY,
                }}
              >
                <LoadableImage
                  src={images[1] || heroImage}
                  alt="Cinematic gaming screenshot from the Maverick Drills gallery"
                  fill
                  sizes="
                    (min-width: 1024px) 50vw,
                    100vw
                  "
                  className="object-cover"
                />
              </motion.div>

              <div
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-transparent
                  to-transparent
                "
              />

              <div
                className="
                  absolute bottom-0 left-0
                  p-6 sm:p-8
                "
              >
                <span
                  className="
                    font-heading text-[10px]
                    uppercase tracking-[0.15em]
                    text-red
                  "
                >
                  THE MAVERICK PERSPECTIVE
                </span>

                <p
                  className="
                    mt-3 font-display
                    text-2xl uppercase
                    leading-tight text-white
                    sm:text-3xl
                  "
                >
                  ART IN
                  <span className="block">MOTION.</span>
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* =====================================
          03 / EXPERIENCE CARDS
      ===================================== */}
      <section
        className="
          relative overflow-hidden
          border-b border-border
          bg-[#090A0D]
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-40 top-10
            h-[500px] w-[500px]
            rounded-full bg-red/[0.05]
            blur-[120px]
          "
        />

        <div
          className="
            relative mx-auto max-w-7xl
            px-5 py-24 sm:px-8
            lg:px-12 lg:py-32
            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
            min-[2000px]:px-16
          "
        >
          <MotionReveal>
            <SectionLabel>02 / THE EXPERIENCE</SectionLabel>

            <h2
              className="
                mt-5 font-display
                text-3xl uppercase
                leading-tight text-white
                sm:text-5xl
              "
            >
              EXPLORE THE WORLD
              <span className="block text-red">OF MAVERICK.</span>
            </h2>
          </MotionReveal>

          <div
            className="
              mt-12 grid gap-4
              md:grid-cols-3
              lg:gap-6
            "
          >
            {experiences.map((item, index) => (
              <MotionReveal
                key={item.href}
                delay={index * 0.1}
                className="min-w-0"
              >
                <PremiumTiltCard maxTilt={3}>
                  <Link
                    href={item.href}
                    className="
                      group relative flex
                      min-h-[330px] h-full
                      flex-col overflow-hidden

                      border border-white/10
                      bg-surface p-6
                      transition-colors duration-300

                      hover:border-red/60
                      sm:p-7
                    "
                  >
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute -right-24 -top-24
                        h-60 w-60 rounded-full
                        bg-red/[0.08] blur-3xl
                      "
                    />

                    <div
                      className="
                        relative flex items-center
                        justify-between
                      "
                    >
                      <span
                        className="
                          font-display
                          text-4xl text-red
                        "
                      >
                        {item.number}
                      </span>

                      <span
                        aria-hidden="true"
                        className="
                          text-xl text-white/40
                          transition-transform
                          group-hover:translate-x-1
                          group-hover:-translate-y-1
                        "
                      >
                        ↗
                      </span>
                    </div>

                    <div className="relative mt-auto">
                      <p
                        className="
                          font-body text-[10px]
                          uppercase tracking-[0.16em]
                          text-red
                        "
                      >
                        {item.eyebrow}
                      </p>

                      <h3
                        className="
                          mt-4 font-heading
                          text-xl uppercase
                          text-white
                          sm:text-2xl
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-4 font-body text-sm
                          leading-relaxed
                          text-white/60
                        "
                      >
                        {item.description}
                      </p>

                      <div
                        className="
                          mt-7 border-t
                          border-white/10 pt-4
                          font-heading text-[10px]
                          uppercase text-red
                        "
                      >
                        {item.action} ↗
                      </div>
                    </div>
                  </Link>
                </PremiumTiltCard>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          04 / FEATURED VIDEO
      ===================================== */}
      {video && (
        <section
          className="
            relative overflow-hidden
            border-b border-border
          "
        >
          <div
            className="
              mx-auto grid max-w-7xl
              items-center gap-10
              px-5 py-24 sm:px-8
              lg:grid-cols-[0.8fr_1.2fr]
              lg:gap-16 lg:px-12
              lg:py-32
              2xl:max-w-[1536px]
              min-[2000px]:max-w-[1760px]
              min-[2000px]:px-16
            "
          >
            <MotionReveal>
              <SectionLabel>03 / FROM THE CHANNEL</SectionLabel>

              <h2
                className="
                  mt-6 font-display
                  text-3xl uppercase
                  leading-[1.03] text-white
                  sm:text-5xl
                "
              >
                THE MOMENTS
                <span className="block text-red">WE CREATE.</span>
              </h2>

              <p
                className="
                  mt-6 font-body text-sm
                  leading-relaxed text-muted
                  sm:text-base
                "
              >
                Original gameplay, cinematic edits, and the gaming experiences
                that define Maverick Drills.
              </p>

              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-8 inline-flex
                  items-center gap-3
                  border-b border-red pb-2
                  font-heading text-xs
                  uppercase text-white
                  transition-colors
                  hover:text-red
                "
              >
                VISIT OUR YOUTUBE CHANNEL ↗
              </a>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <PremiumTiltCard maxTilt={2.5}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${video.title}`}
                  className="
                    group relative block
                    aspect-video
                    overflow-hidden
                    border border-white/15
                    bg-surface
                  "
                >
                  {/* YouTube thumbnail */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="
                      absolute inset-0
                      h-full w-full object-cover
                      transition-transform duration-700
                      group-hover:scale-105
                      motion-reduce:transition-none
                      motion-reduce:group-hover:scale-100
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/95
                      via-black/20
                      to-transparent
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      flex items-center justify-center
                    "
                  >
                    <motion.div
                      whileHover={reduceMotion ? undefined : { scale: 1.12 }}
                      className="
                        flex h-16 w-16
                        items-center justify-center
                        rounded-full bg-red
                        shadow-[0_0_45px_rgba(229,9,36,0.4)]
                      "
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 5.5v13l11-6.5z" />
                      </svg>
                    </motion.div>
                  </div>

                  <div
                    className="
                      absolute inset-x-0
                      bottom-0 p-5 sm:p-7
                    "
                  >
                    <p
                      className="
                        font-body text-[10px]
                        uppercase tracking-widest
                        text-red
                      "
                    >
                      WATCH THE LATEST
                    </p>

                    <h3
                      className="
                        mt-2 font-heading
                        text-sm uppercase
                        leading-relaxed
                        text-white sm:text-lg
                      "
                    >
                      {video.title}
                    </h3>
                  </div>
                </a>
              </PremiumTiltCard>
            </MotionReveal>
          </div>
        </section>
      )}

      {/* =====================================
          05 / COMMUNITY + CALL TO ACTION
      ===================================== */}
      <section
        className="
          relative isolate overflow-hidden
          bg-[#090A0D]
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(ellipse_at_50%_100%,rgba(229,9,36,0.14),transparent_70%)]
          "
        />

        <div
          className="
            relative mx-auto max-w-7xl
            px-5 py-24 text-center
            sm:px-8 lg:px-12 lg:py-36
            2xl:max-w-[1536px]
            min-[2000px]:max-w-[1760px]
            min-[2000px]:px-16
          "
        >
          <MotionReveal>
            <p
              className="
                font-heading text-xs
                uppercase tracking-[0.2em]
                text-red
              "
            >
              04 / JOIN THE JOURNEY
            </p>

            <h2
              className="
                mx-auto mt-6 max-w-5xl
                font-display
                text-[clamp(2.8rem,7vw,7rem)]
                uppercase leading-[0.95]
                tracking-[-0.06em]
                text-white
              "
            >
              THE GAME
              <span className="block text-red">NEVER ENDS.</span>
            </h2>

            <p
              className="
                mx-auto mt-7 max-w-xl
                font-body text-sm
                leading-relaxed text-muted
                sm:text-base
              "
            >
              Follow the gaming moments, new uploads, and everything happening
              in the Maverick Drills community.
            </p>

            <div
              className="
                mt-10 flex flex-wrap
                items-center justify-center
                gap-3
              "
            >
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  cinematic-button
                  inline-flex min-h-12
                  items-center justify-center
                  gap-2 clip-corner-sm
                  bg-red px-6 py-3
                  font-heading text-xs
                  uppercase text-white
                  transition-colors
                  hover:bg-red-deep
                "
              >
                SUBSCRIBE ON YOUTUBE ↗
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex min-h-12
                  items-center justify-center
                  gap-2 clip-corner-sm
                  border border-white/25
                  bg-surface px-6 py-3
                  font-heading text-xs
                  uppercase text-white
                  transition-colors
                  hover:border-red hover:text-red
                "
              >
                FOLLOW ON INSTAGRAM ↗
              </a>
            </div>

            <div
              className="
                mx-auto mt-16 max-w-xl
                border-t border-white/10
                pt-8
              "
            >
              <p
                className="
                  font-body text-sm text-muted
                "
              >
                Thoughts, questions, or feedback?
              </p>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="
                  mt-3 inline-block
                  break-all font-heading
                  text-xs uppercase
                  text-white
                  transition-colors
                  hover:text-red
                  sm:text-sm
                "
              >
                {CONTACT_EMAIL} ↗
              </a>
            </div>
          </MotionReveal>
        </div>
      </section>
    </main>
  );
}
