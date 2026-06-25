"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Icon from "./Icon";
import ClinicBookingModal from "./ClinicBookingModal";
import {
  clinicGroups,
  clinicTreatmentsForConcern,
  concerns,
  homeCategories,
  homeServicesForConcern,
  type ClinicTreatment,
  type HomeService,
} from "../data/services";
import { bookingMessage, whatsappUrl } from "../lib/whatsapp";

type Mode = "home" | "clinic";

const HOME_CATEGORY_IDS = new Set(homeCategories.map((c) => c.id));
const CLINIC_GROUP_IDS = new Set(clinicGroups.map((g) => g.id));

// Lookups so concern results can show the right icon/label without re-nesting.
const homeIconByTitle = new Map<string, string>();
homeCategories.forEach((c) =>
  c.services.forEach((s) => homeIconByTitle.set(s.title, c.icon)),
);

const clinicMetaByTitle = new Map<string, { icon: string; group: string }>();
clinicGroups.forEach((g) =>
  g.treatments.forEach((t) =>
    clinicMetaByTitle.set(t.title, { icon: g.icon, group: g.name }),
  ),
);

export default function ServicesExplorer() {
  const [mode, setMode] = useState<Mode>("home");
  const [activeConcern, setActiveConcern] = useState<string | null>(null);
  const [bookingTreatment, setBookingTreatment] =
    useState<ClinicTreatment | null>(null);

  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Switch tab (if needed) then scroll once the target has had a chance to
  // render. The small delay covers the case where the tab content for the
  // target is mounting in this same update.
  const goTo = useCallback(
    (next: Mode, targetId: string) => {
      setMode(next);
      setTimeout(() => scrollToId(targetId), 70);
    },
    [scrollToId],
  );

  // Resolve a URL hash to the correct tab + scroll target. This keeps the nav,
  // hero CTAs, category strip, and footer anchor links working even when the
  // target lives inside a tab that is not currently visible.
  const handleHash = useCallback(() => {
    const raw = window.location.hash.replace("#", "");
    if (!raw) return;

    if (raw === "concern") {
      scrollToId("concern");
    } else if (
      raw === "in-clinic" ||
      raw === "clinic" ||
      CLINIC_GROUP_IDS.has(raw)
    ) {
      goTo("clinic", CLINIC_GROUP_IDS.has(raw) ? raw : "browse");
    } else if (
      raw === "at-home" ||
      raw === "home" ||
      HOME_CATEGORY_IDS.has(raw)
    ) {
      goTo("home", HOME_CATEGORY_IDS.has(raw) ? raw : "browse");
    }
  }, [goTo, scrollToId]);

  useEffect(() => {
    // Defer so the initial tab switch doesn't run synchronously in the effect.
    const initial = setTimeout(handleHash, 0);
    window.addEventListener("hashchange", handleHash);
    return () => {
      clearTimeout(initial);
      window.removeEventListener("hashchange", handleHash);
    };
  }, [handleHash]);

  const selectMode = useCallback(
    (next: Mode) => goTo(next, "browse"),
    [goTo],
  );

  return (
    <>
      {/* Entry by intent */}
      <IntentPaths
        onHome={() => selectMode("home")}
        onClinic={() => selectMode("clinic")}
        onHelp={() => scrollToId("concern")}
      />

      {/* Browse by concern */}
      <ConcernBrowser
        activeConcern={activeConcern}
        onSelect={(id) =>
          setActiveConcern((prev) => (prev === id ? null : id))
        }
        onBook={setBookingTreatment}
      />

      {/* Browse by full category */}
      <div id="browse" className="mt-24 scroll-mt-28">
        <div className="reveal flex flex-col items-center text-center">
          <p className="eyebrow mb-4">Browse the full menu</p>
          <ModeTabs mode={mode} onChange={(m) => selectMode(m)} />
        </div>

        <div className="mt-14">
          {mode === "home" ? (
            <HomeMenu />
          ) : (
            <ClinicMenu onBook={setBookingTreatment} />
          )}
        </div>
      </div>

      {bookingTreatment && (
        <ClinicBookingModal
          key={bookingTreatment.title}
          treatment={bookingTreatment}
          onClose={() => setBookingTreatment(null)}
        />
      )}
    </>
  );
}

function IntentPaths({
  onHome,
  onClinic,
  onHelp,
}: {
  onHome: () => void;
  onClinic: () => void;
  onHelp: () => void;
}) {
  const paths = [
    {
      icon: "home_health",
      title: "Book a Home Service",
      text: "Salon, nails, hair, massage, makeup, lashes and brows at your location.",
      action: "At-home services",
      onClick: onHome,
    },
    {
      icon: "local_hospital",
      title: "Visit the Clinic",
      text: "Advanced skin, anti-aging, injectables, rejuvenation and body treatments.",
      action: "In-clinic treatments",
      onClick: onClinic,
    },
    {
      icon: "quiz",
      title: "Help Me Choose",
      text: "Tell us your concern and we’ll guide you to the right service.",
      action: "Shop by concern",
      onClick: onHelp,
    },
  ];

  return (
    <div className="mt-14">
      <p className="reveal eyebrow mb-6 text-center">What are you looking for?</p>
      <div className="grid gap-5 md:grid-cols-3">
        {paths.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onClick={p.onClick}
            className="reveal glass card-lift group flex flex-col items-start rounded-[22px] p-7 text-left"
            data-reveal-delay={`${i * 80}`}
          >
            <span className="flex size-13 items-center justify-center rounded-2xl bg-primary/90 p-3.5">
              <Icon name={p.icon} className="text-[1.5rem] text-on-primary" />
            </span>
            <h3 className="mt-5 font-display text-[1.3rem] font-bold leading-snug text-ink">
              {p.title}
            </h3>
            <p className="mt-2.5 flex-1 text-[0.9rem] leading-relaxed text-muted">
              {p.text}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-primary-hover transition-colors group-hover:text-primary">
              {p.action}
              <Icon
                name="arrow_forward"
                className="text-[1.05rem] transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ConcernBrowser({
  activeConcern,
  onSelect,
  onBook,
}: {
  activeConcern: string | null;
  onSelect: (id: string) => void;
  onBook: (treatment: ClinicTreatment) => void;
}) {
  const clinicMatches = activeConcern
    ? clinicTreatmentsForConcern(activeConcern)
    : [];
  const homeMatches = activeConcern
    ? homeServicesForConcern(activeConcern)
    : [];
  const activeLabel = concerns.find((c) => c.id === activeConcern)?.label;

  return (
    <div id="concern" className="mt-24 scroll-mt-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-4">Help me choose</p>
        <h3 className="font-display text-[2rem] font-bold leading-tight text-ink sm:text-[2.4rem]">
          I want to improve…
        </h3>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
          Not sure which treatment you need? Pick a concern and we&rsquo;ll show
          the services that help — across both home and clinic.
        </p>
      </div>

      <div className="reveal mt-8 flex flex-wrap justify-center gap-2.5" data-reveal-delay="60">
        {concerns.map((c) => {
          const isActive = c.id === activeConcern;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              aria-pressed={isActive}
              className={`state-layer inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.88rem] font-medium transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                isActive
                  ? "border-primary-hover bg-primary text-on-primary"
                  : "border-hairline bg-surface/40 text-ink hover:border-primary-hover/50"
              }`}
            >
              <Icon name={c.icon} className="relative z-10 text-[1.15rem]" />
              <span className="relative z-10">{c.label}</span>
            </button>
          );
        })}
      </div>

      {activeConcern && (
        <div className="reveal is-visible mt-10">
          <div className="glass mx-auto max-w-4xl rounded-[24px] p-6 sm:p-8">
            <p className="text-[0.8rem] uppercase tracking-[0.2em] text-muted">
              Concern
            </p>
            <h4 className="mt-1 font-display text-[1.5rem] font-bold text-ink">
              {activeLabel}
            </h4>

            {clinicMatches.length > 0 && (
              <div className="mt-6">
                <p className="flex items-center gap-2 text-[0.85rem] font-semibold uppercase tracking-wide text-primary-hover">
                  <Icon name="local_hospital" className="text-[1.1rem]" />
                  Recommended clinic treatments
                </p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {clinicMatches.map((t) => (
                    <button
                      key={t.title}
                      type="button"
                      onClick={() => onBook(t)}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface/40 px-4 py-3 text-left transition-colors hover:border-primary-hover/50"
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          name={clinicMetaByTitle.get(t.title)?.icon ?? "spa"}
                          className="text-[1.25rem] text-primary-hover"
                        />
                        <span className="text-[0.9rem] font-medium text-ink">
                          {t.title}
                        </span>
                      </span>
                      <Icon
                        name="calendar_add_on"
                        className="text-[1.15rem] text-muted transition-colors group-hover:text-primary-hover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {homeMatches.length > 0 && (
              <div className="mt-6">
                <p className="flex items-center gap-2 text-[0.85rem] font-semibold uppercase tracking-wide text-gold">
                  <Icon name="home_health" className="text-[1.1rem]" />
                  Related home services
                </p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {homeMatches.map((s) => (
                    <a
                      key={s.title}
                      href={whatsappUrl(bookingMessage(s.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface/40 px-4 py-3 transition-colors hover:border-gold/50"
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          name={homeIconByTitle.get(s.title) ?? "spa"}
                          className="text-[1.25rem] text-gold"
                        />
                        <span className="text-[0.9rem] font-medium text-ink">
                          {s.title}
                        </span>
                      </span>
                      <Icon
                        name="chat"
                        className="text-[1.15rem] text-muted transition-colors group-hover:text-gold"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {clinicMatches.length === 0 && homeMatches.length === 0 && (
              <p className="mt-4 text-[0.9rem] text-muted">
                No matching services yet. Try the doctor consultation to build a
                personalized plan.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ModeTabs({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  const tabs: { id: Mode; label: string; icon: string }[] = [
    { id: "home", label: "At Home", icon: "home_health" },
    { id: "clinic", label: "In Clinic", icon: "local_hospital" },
  ];
  return (
    <div className="glass-strong inline-flex items-center gap-1 rounded-full p-1.5">
      {tabs.map((t) => {
        const isActive = t.id === mode;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            aria-pressed={isActive}
            className={`state-layer inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.92rem] font-medium transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] sm:px-7 ${
              isActive
                ? "bg-primary text-on-primary"
                : "text-muted hover:text-ink"
            }`}
          >
            <Icon name={t.icon} className="relative z-10 text-[1.25rem]" />
            <span className="relative z-10">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function HomeMenu() {
  return (
    <div className="space-y-24">
      {homeCategories.map((cat) => (
        <div key={cat.id} id={cat.id} className="scroll-mt-28">
          <div
            className="reveal flex flex-col gap-3 border-b border-hairline pb-6 sm:flex-row sm:items-center sm:gap-5"
            data-reveal-delay="40"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/90">
              <Icon name={cat.icon} className="text-[1.4rem] text-on-primary" />
            </span>
            <div>
              <h3 className="font-display text-[1.7rem] font-bold leading-tight text-ink">
                {cat.name}
              </h3>
              <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">
                {cat.blurb}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cat.services.map((s, si) => (
              <HomeServiceCard
                key={s.title}
                service={s}
                icon={cat.icon}
                delay={si * 60}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function HomeServiceCard({
  service,
  icon,
  delay,
}: {
  service: HomeService;
  icon: string;
  delay: number;
}) {
  return (
    <article
      className="reveal glass card-lift group flex flex-col overflow-hidden rounded-[20px]"
      data-reveal-delay={`${delay}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden image-fade">
        <Image
          src={`https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=700&q=90`}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm">
          <Icon name={icon} className="text-[1.15rem] text-on-primary" />
        </span>
        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-canvas-deep/70 px-2.5 py-1 text-[0.68rem] font-medium text-ink backdrop-blur-sm">
          <Icon name="home_health" className="text-[0.85rem] text-primary-hover" />
          At your location
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-display text-[1.2rem] font-bold leading-snug text-ink">
          {service.title}
        </h4>
        <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted">
          {service.text}
        </p>
        <a
          href={whatsappUrl(bookingMessage(service.title))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-primary transition-colors group-hover:text-primary-deep"
        >
          <Icon name="chat" className="text-[1.05rem]" />
          Book via WhatsApp
        </a>
      </div>
    </article>
  );
}

function ClinicMenu({
  onBook,
}: {
  onBook: (treatment: ClinicTreatment) => void;
}) {
  return (
    <div className="space-y-20">
      {clinicGroups.map((group) => (
        <div key={group.id} id={group.id} className="scroll-mt-28">
          <div
            className="reveal flex flex-col gap-3 border-b border-hairline pb-6 sm:flex-row sm:items-center sm:gap-5"
            data-reveal-delay="40"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-green">
              <Icon name={group.icon} className="text-[1.4rem] text-on-primary" />
            </span>
            <div>
              <h3 className="font-display text-[1.7rem] font-bold leading-tight text-ink">
                {group.name}
              </h3>
              <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">
                {group.blurb}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.treatments.map((t, ti) => (
              <ClinicTreatmentCard
                key={t.title}
                treatment={t}
                icon={group.icon}
                groupName={group.name}
                delay={ti * 60}
                onBook={() => onBook(t)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ClinicTreatmentCard({
  treatment,
  icon,
  groupName,
  delay,
  onBook,
}: {
  treatment: ClinicTreatment;
  icon: string;
  groupName: string;
  delay: number;
  onBook: () => void;
}) {
  return (
    <article
      className="reveal glass card-lift group flex flex-col overflow-hidden rounded-[20px]"
      data-reveal-delay={`${delay}`}
    >
      <div className="relative overflow-hidden bg-gradient-green px-6 py-5">
        <div
          className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"
          aria-hidden
        />
        <div className="relative flex items-center justify-between">
          <span className="flex size-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
            <Icon name={icon} className="text-[1.35rem] text-on-primary" />
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/15 px-2.5 py-1 text-[0.66rem] font-medium uppercase tracking-wide text-on-primary">
            <Icon name="local_hospital" className="text-[0.85rem]" />
            In-clinic
          </span>
        </div>
        <p className="relative mt-3 text-[0.75rem] font-medium uppercase tracking-wide text-on-primary/80">
          {groupName}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-display text-[1.2rem] font-bold leading-snug text-ink">
          {treatment.title}
        </h4>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
          {treatment.text}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {treatment.benefits.slice(0, 3).map((b) => (
            <li
              key={b}
              className="inline-flex items-center gap-1 rounded-full border border-hairline bg-surface/40 px-2.5 py-1 text-[0.72rem] text-muted"
            >
              <Icon
                name="check"
                className="text-[0.85rem] text-primary-hover"
              />
              {b}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onBook}
          className="state-layer ripple mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-primary-hover/40 bg-primary/15 px-5 text-[0.85rem] font-medium text-primary-hover transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:border-primary-hover hover:bg-primary hover:text-on-primary"
        >
          <Icon name="event_available" className="relative z-10 text-[1.1rem]" />
          <span className="relative z-10">Check appointment availability</span>
        </button>
      </div>
    </article>
  );
}
