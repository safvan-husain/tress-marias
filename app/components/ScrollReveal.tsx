"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const reduceMotion =
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const reveal = (root: ParentNode) =>
        root
          .querySelectorAll<HTMLElement>(".reveal, .reveal-hero")
          .forEach((el) => el.classList.add("is-visible"));
      reveal(document);
      // Reveal any content mounted later (e.g. tab switches, dialogs).
      const mo = new MutationObserver((mutations) => {
        mutations.forEach((m) =>
          m.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.matches(".reveal, .reveal-hero"))
                node.classList.add("is-visible");
              reveal(node);
            }
          }),
        );
      });
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay;
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const observeIn = (root: ParentNode) =>
      root
        .querySelectorAll<HTMLElement>(".reveal, .reveal-hero")
        .forEach((el) => {
          if (!el.classList.contains("is-visible")) observer.observe(el);
        });

    observeIn(document);

    // Catch elements added after the initial pass (tab content, dialogs, etc.).
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) =>
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (
              node.matches(".reveal, .reveal-hero") &&
              !node.classList.contains("is-visible")
            ) {
              observer.observe(node);
            }
            observeIn(node);
          }
        }),
      );
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
