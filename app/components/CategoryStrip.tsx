"use client";

import { useState } from "react";
import Icon from "./Icon";

const categories = [
  { label: "Nails", icon: "back_hand", href: "#nails" },
  { label: "Hair", icon: "content_cut", href: "#hair" },
  { label: "Massage", icon: "spa", href: "#massage" },
  { label: "Makeup", icon: "brush", href: "#makeup" },
  { label: "Lashes", icon: "visibility", href: "#lashes" },
  { label: "Brows", icon: "face", href: "#brows" },
];

export default function CategoryStrip() {
  const [active, setActive] = useState(0);

  return (
    <div className="glass-strong flex items-center gap-1 rounded-full p-1.5">
      <button
        type="button"
        aria-label="Previous category"
        onClick={() => setActive((a) => (a - 1 + categories.length) % categories.length)}
        className="state-layer flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
      >
        <Icon name="chevron_left" className="relative z-10 text-[1.3rem]" />
      </button>

      <div className="flex items-center gap-1">
        {categories.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => {
                setActive(i);
                document
                  .querySelector(c.href)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`state-layer flex items-center gap-2 rounded-full px-3 py-2 text-[0.85rem] transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] sm:px-4 ${
                isActive
                  ? "bg-primary text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Icon name={c.icon} className="relative z-10 text-[1.2rem]" />
              <span
                className={`relative z-10 ${isActive ? "inline" : "hidden sm:inline"}`}
              >
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Next category"
        onClick={() => setActive((a) => (a + 1) % categories.length)}
        className="state-layer flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
      >
        <Icon name="chevron_right" className="relative z-10 text-[1.3rem]" />
      </button>
    </div>
  );
}
