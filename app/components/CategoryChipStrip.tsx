"use client";

import Icon from "./Icon";

export type ChipItem = {
  id: string;
  label: string;
  icon: string;
};

type CategoryChipStripProps = {
  items: ChipItem[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onItemActivate?: (index: number, item: ChipItem) => void;
  className?: string;
};

export default function CategoryChipStrip({
  items,
  activeIndex,
  onActiveIndexChange,
  onItemActivate,
  className = "",
}: CategoryChipStripProps) {
  function goPrev() {
    const next = (activeIndex - 1 + items.length) % items.length;
    onActiveIndexChange(next);
  }

  function goNext() {
    const next = (activeIndex + 1) % items.length;
    onActiveIndexChange(next);
  }

  function selectItem(index: number) {
    if (index === activeIndex) return;
    onActiveIndexChange(index);
    onItemActivate?.(index, items[index]);
  }

  return (
    <div
      className={`glass-strong flex max-w-full items-center gap-1 rounded-full p-1.5 ${className}`}
    >
      <button
        type="button"
        aria-label="Previous category"
        onClick={goPrev}
        className="state-layer flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
      >
        <Icon name="chevron_left" className="relative z-10 text-[1.3rem]" />
      </button>

      <div className="flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectItem(index)}
              className={`state-layer flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-[0.85rem] transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] sm:px-4 ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Icon name={item.icon} className="relative z-10 text-[1.2rem]" />
              <span
                className={`relative z-10 whitespace-nowrap ${isActive ? "inline" : "hidden sm:inline"}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Next category"
        onClick={goNext}
        className="state-layer flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
      >
        <Icon name="chevron_right" className="relative z-10 text-[1.3rem]" />
      </button>
    </div>
  );
}
