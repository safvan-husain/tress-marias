"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryChipStrip from "./CategoryChipStrip";
import { homeCategoryChips } from "../data/services";

export default function CategoryStrip() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  return (
    <CategoryChipStrip
      items={homeCategoryChips}
      activeIndex={active}
      onActiveIndexChange={setActive}
      onItemActivate={(_index, item) => {
        router.push(`/home-services#${item.id}`);
      }}
    />
  );
}
