"use client";

import { useRef } from "react";
import Icon from "./Icon";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  icon?: string;
  className?: string;
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  icon = "arrow_forward",
  className = "",
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ink = document.createElement("span");
    ink.className = "ripple-ink";
    ink.style.width = ink.style.height = `${size}px`;
    ink.style.left = `${e.clientX - rect.left - size / 2}px`;
    ink.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(ink);
    window.setTimeout(() => ink.remove(), 600);
  };

  const base =
    "ripple state-layer inline-flex items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] min-h-[48px]";

  const styles =
    variant === "primary"
      ? "bg-primary text-ink hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(46,139,122,0.6)]"
      : "border border-primary/60 text-ink hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]";

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <Icon name={icon} className="relative z-10 text-[1.15rem]" />
    </a>
  );
}
