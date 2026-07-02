"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: string;
};

type Props = {
  items: AdminNavItem[];
  username: string;
  role: string;
};

const STORAGE_KEY = "admin-sidebar-expanded";

export default function AdminSidebar({ items, username, role }: Props) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "1";
  });

  function toggle() {
    const next = !expanded;
    setExpanded(next);
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  }

  return (
    <aside
      suppressHydrationWarning
      className={`flex h-full shrink-0 flex-col border-r border-hairline bg-canvas-deep transition-[width] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
        expanded ? "w-[220px]" : "w-14"
      }`}
    >
      <div
        className={`flex h-14 items-center border-b border-hairline ${
          expanded ? "justify-between px-4" : "justify-center"
        }`}
      >
        {expanded && (
          <span className="truncate font-display text-[0.95rem] font-bold text-ink">
            Admin
          </span>
        )}
        <button
          type="button"
          onClick={toggle}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          className="state-layer flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-ink"
        >
          <Icon
            name={expanded ? "chevron_left" : "chevron_right"}
            className="relative z-10 text-[1.2rem]"
          />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-2">
        {items.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`flex items-center gap-3 rounded-xl py-2.5 text-[0.88rem] font-medium transition-colors ${
                active
                  ? "bg-primary/20 text-primary-hover"
                  : "text-muted hover:bg-surface/60 hover:text-ink"
              } ${expanded ? "px-3" : "justify-center px-0"}`}
            >
              <Icon name={item.icon} className="shrink-0 text-[1.25rem]" />
              {expanded && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div
        className={`border-t border-hairline p-3 ${
          expanded ? "" : "flex justify-center"
        }`}
      >
        {expanded ? (
          <div className="truncate text-[0.78rem] text-muted">
            <p className="truncate font-medium text-ink">{username}</p>
            <p className="capitalize">{role}</p>
          </div>
        ) : (
          <Icon name="account_circle" className="text-[1.35rem] text-muted" />
        )}
      </div>
    </aside>
  );
}
