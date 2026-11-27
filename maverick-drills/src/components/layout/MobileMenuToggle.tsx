"use client";

import { useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuIcon, CloseIcon, YouTubeIcon, InstagramIcon } from "../ui/icons";

type NavLink = {
  href: string;
  label: string;
};

type Props = {
  links: NavLink[];
  youtubeUrl: string;
  instagramUrl: string;
};

export default function MobileMenuToggle({
  links,
  youtubeUrl,
  instagramUrl,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setOpen(false);

  // Close when the route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    const previouslyFocused = document.activeElement;

    document.body.style.overflow = "hidden";

    const panel = panelRef.current;

    const closeButton = panel?.querySelector<HTMLButtonElement>(
      '[data-menu-close="true"]',
    );

    closeButton?.focus();

    const getFocusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const elements = getFocusable();

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (!first || !last) return;

      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !panel?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !panel?.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", onKeyDown);

      window.removeEventListener("resize", onResize);

      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused.isConnected
      ) {
        previouslyFocused.focus();
      } else {
        triggerRef.current?.focus();
      }
    };
  }, [open]);

  const menuPanel = (
    <div
      ref={panelRef}
      id="maverick-mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Maverick Drills navigation"
      className="
        fixed inset-0 z-[999]
        overflow-x-hidden overflow-y-auto
        overscroll-contain
        bg-[#090A0D] text-white

        lg:hidden

        motion-safe:animate-[md-menu-in_350ms_ease-out_both]
      "
    >
      <style>{`
        @keyframes md-menu-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes md-item-in {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #maverick-mobile-menu,
          #maverick-mobile-menu .md-menu-item {
            animation: none !important;
          }
        }
      `}</style>

      {/* BACKGROUND ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 overflow-hidden
        "
      >
        <div
          className="
            absolute -right-32 top-[15%]
            h-[400px] w-[400px]
            rounded-full bg-red/15
            blur-[120px]
          "
        />

        <div
          className="
            absolute -left-32 bottom-[10%]
            h-[300px] w-[300px]
            rounded-full bg-red/5
            blur-[100px]
          "
        />

        <div
          className="
            absolute inset-0 opacity-[0.035]
            [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
            [background-size:42px_42px]
          "
        />
      </div>

      {/* MAIN CONTENT */}
      <div
        className="
          relative z-10 mx-auto
          flex min-h-[100svh] w-full
          max-w-[700px] flex-col

          px-5 pb-[max(24px,env(safe-area-inset-bottom))]
          pt-[max(20px,env(safe-area-inset-top))]

          sm:px-8
        "
      >
        {/* HEADER */}
        <div
          className="
            flex min-h-16
            items-center justify-between
            gap-4 border-b border-white/10 pb-4
          "
        >
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Maverick Drills homepage"
            className="
              inline-flex items-center gap-1.5
              font-display text-lg italic
              tracking-[-0.055em]
              sm:text-xl
            "
          >
            <span>MAVERICK</span>
            <span className="text-red">DRILLS</span>
          </Link>

          <button
            data-menu-close="true"
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation"
            className="
              flex h-11 w-11
              shrink-0 items-center justify-center
              rounded-full

              border border-white/15
              bg-white/5 text-white

              transition-colors
              hover:border-red hover:bg-red
            "
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* EDITORIAL LABEL */}
        <div className="mb-5 mt-8 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-red" />
          <p
            className="
              font-body text-[10px]
              font-semibold uppercase
              tracking-[0.22em]
              text-white/50
            "
          >
            THE MAVERICK EXPERIENCE
          </p>
        </div>

        {/* NAVIGATION */}
        <nav
          aria-label="Mobile and tablet navigation"
          className="flex flex-col"
        >
          {links.map((link, index) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={isActive ? "page" : undefined}
                style={{
                  animationDelay: `${index * 65}ms`,
                }}
                className={`
                  md-menu-item group relative
                  flex min-h-[66px]
                  items-center justify-between
                  gap-3 border-b border-white/10 py-3

                  motion-safe:animate-[md-item-in_450ms_ease-out_both]

                  transition-colors

                  ${isActive ? "text-red" : "text-white hover:text-red"}
                `}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`
                      shrink-0 font-body
                      text-[10px] tracking-widest

                      ${isActive ? "text-red" : "text-white/35"}
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      font-display
                      text-[clamp(1.25rem,5vw,1.9rem)]
                      uppercase leading-tight
                      tracking-[-0.045em]
                    "
                  >
                    {link.label}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className={`
                    shrink-0
                    transition-transform
                    group-hover:translate-x-1
                    group-hover:-translate-y-1

                    ${isActive ? "text-red" : "text-white/35"}
                  `}
                >
                  ↗
                </span>

                {isActive && (
                  <span
                    aria-hidden="true"
                    className="
                      absolute bottom-0 left-0
                      h-px w-24 bg-red
                    "
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* SOCIAL FOOTER */}
        <div className="mt-auto pt-10">
          <div
            className="
              border border-white/10
              bg-white/[0.035]
              p-5 backdrop-blur-sm
            "
          >
            <p
              className="
                font-body text-[10px]
                font-semibold uppercase
                tracking-[0.18em]
                text-white/45
              "
            >
              FOLLOW THE JOURNEY
            </p>

            <div className="mt-4 flex gap-3">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                aria-label="Maverick Drills YouTube"
                className="
                  flex h-12 w-12
                  items-center justify-center
                  border border-white/15
                  bg-white/5 text-white
                  transition-colors
                  hover:border-red hover:bg-red
                "
              >
                <YouTubeIcon className="h-5 w-5" />
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                aria-label="Maverick Drills Instagram"
                className="
                  flex h-12 w-12
                  items-center justify-center
                  border border-white/15
                  bg-white/5 text-white
                  transition-colors
                  hover:border-red hover:bg-red
                "
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>

            <p
              className="
                mt-5 font-heading text-[10px]
                uppercase tracking-[0.14em]
                text-red
              "
            >
              LEVEL UP YOUR GAME.
            </p>
          </div>

          <div
            className="
              mt-6 flex flex-wrap
              items-center justify-between gap-2
              font-body text-[9px]
              uppercase tracking-[0.12em]
              text-white/35
            "
          >
            <span>MAVERICK DRILLS</span>
            <span>GAMING / ORIGINALS / COMMUNITY</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open navigation"
        aria-expanded={open}
        aria-controls={open ? "maverick-mobile-menu" : undefined}
        onClick={() => setOpen(true)}
        className="
          flex h-11 w-11
          items-center justify-center
          text-foreground
          transition-colors
          hover:text-red
        "
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {open && createPortal(menuPanel, document.body)}
    </div>
  );
}
