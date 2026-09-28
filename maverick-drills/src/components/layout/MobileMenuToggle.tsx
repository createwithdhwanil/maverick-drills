"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, CloseIcon, YouTubeIcon, InstagramIcon } from "../ui/icons";

type NavLink = { href: string; label: string };

export default function MobileMenuToggle({
  links,
  youtubeUrl,
  instagramUrl,
}: {
  links: NavLink[];
  youtubeUrl: string;
  instagramUrl: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="text-foreground"
      >
        {open ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-[65px] bottom-0 z-40 flex flex-col bg-background px-6 py-8">
          <nav className="flex flex-col gap-6 font-heading text-2xl">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-8">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 clip-corner-sm bg-red px-5 py-3 font-heading text-sm text-white"
            >
              <YouTubeIcon className="h-4 w-4" />
              SUBSCRIBE ON YOUTUBE
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 clip-corner-sm border border-border px-5 py-3 font-heading text-sm"
            >
              <InstagramIcon className="h-4 w-4" />
              FOLLOW ON INSTAGRAM
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
