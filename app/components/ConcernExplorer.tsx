"use client";

import { useState } from "react";
import Icon from "./Icon";
import ClinicBookingModal from "./ClinicBookingModal";
import {
  clinicGroups,
  clinicTreatmentsForConcern,
  concerns,
  homeCategories,
  homeServicesForConcern,
  type ClinicTreatment,
} from "../data/services";
import { bookingMessage, whatsappUrl } from "../lib/whatsapp";

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

export default function ConcernExplorer() {
  const [activeConcern, setActiveConcern] = useState<string | null>(null);
  const [bookingTreatment, setBookingTreatment] =
    useState<ClinicTreatment | null>(null);

  const clinicMatches = activeConcern
    ? clinicTreatmentsForConcern(activeConcern)
    : [];
  const homeMatches = activeConcern
    ? homeServicesForConcern(activeConcern)
    : [];
  const activeLabel = concerns.find((c) => c.id === activeConcern)?.label;

  return (
    <div id="concern" className="scroll-mt-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-4">Help me find</p>
        <h3 className="font-display text-[2rem] font-bold leading-tight text-ink sm:text-[2.4rem]">
          I want to improve…
        </h3>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
          Not sure which treatment you need? Pick a concern and we&rsquo;ll show
          the services that help — across both home and clinic.
        </p>
      </div>

      <div
        className="reveal mt-8 flex flex-wrap justify-center gap-2.5"
        data-reveal-delay="60"
      >
        {concerns.map((c) => {
          const isActive = c.id === activeConcern;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() =>
                setActiveConcern((prev) => (prev === c.id ? null : c.id))
              }
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
                      onClick={() => setBookingTreatment(t)}
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

      {bookingTreatment && (
        <ClinicBookingModal
          key={bookingTreatment.title}
          treatment={bookingTreatment}
          onClose={() => setBookingTreatment(null)}
        />
      )}
    </div>
  );
}
