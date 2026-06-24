"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const links = ["Nails", "Hair", "Massage", "Makeup", "Lashes", "Brows"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
        scrolled
          ? "border-b border-hairline bg-canvas/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary/90">
            <Icon name="spa" className="text-[1.2rem] text-on-primary" />
          </span>
          <span className="font-display text-[1.35rem] font-bold tracking-tight">
            Tres Marias
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="group relative text-[0.92rem] text-muted transition-colors duration-300 hover:text-ink"
            >
              {l}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#book"
          className="state-layer ripple inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-5 text-[0.9rem] font-medium text-canvas transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5"
        >
          <span className="relative z-10">Book now</span>
          <Icon name="arrow_outward" className="relative z-10 text-[1.05rem]" />
        </a>
      </nav>
    </header>
  );
}
