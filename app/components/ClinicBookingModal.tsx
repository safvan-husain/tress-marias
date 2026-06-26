"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import type { ClinicTreatment } from "../data/services";
import { appointmentRequestMessage, whatsappUrl } from "../lib/whatsapp";

type Props = {
  treatment: ClinicTreatment;
  onClose: () => void;
};

type DayOption = {
  key: string;
  weekday: string;
  day: number;
  month: string;
  label: string;
  closed: boolean;
};

type AvailabilityState = "idle" | "checking" | "available" | "none";
type RequestState = "selecting" | "submitting" | "confirmed";

const BASE_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Deterministic mock availability so the same date always shows the same slots.
// Sundays are treated as closed. This stands in for the real backend.
function buildDays(): DayOption[] {
  const days: DayOption[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let offset = 1; offset <= 14; offset += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    const weekdayIndex = date.getDay();
    days.push({
      key: date.toISOString().slice(0, 10),
      weekday: WEEKDAYS[weekdayIndex],
      day: date.getDate(),
      month: MONTHS[date.getMonth()],
      label: `${WEEKDAYS[weekdayIndex]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`,
      closed: weekdayIndex === 0,
    });
  }
  return days;
}

function slotsForDay(treatmentTitle: string, dayKey: string): string[] {
  const seed = hashString(`${treatmentTitle}|${dayKey}`);
  // ~1 in 7 days is fully booked.
  if (seed % 7 === 0) return [];
  return BASE_SLOTS.filter((slot, index) => (seed + index * 31) % 3 !== 0);
}

export default function ClinicBookingModal({ treatment, onClose }: Props) {
  const days = useMemo(() => buildDays(), []);
  const [selectedDay, setSelectedDay] = useState<DayOption | null>(null);
  const [availability, setAvailability] = useState<AvailabilityState>("idle");
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [request, setRequest] = useState<RequestState>("selecting");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  // Simulate an availability check with a short loading state. The "checking"
  // state is set in the click handler; this effect only resolves the result.
  useEffect(() => {
    if (!selectedDay || selectedDay.closed) return;
    const timer = setTimeout(() => {
      const result = slotsForDay(treatment.title, selectedDay.key);
      setSlots(result);
      setAvailability(result.length > 0 ? "available" : "none");
    }, 650);
    return () => clearTimeout(timer);
  }, [treatment.title, selectedDay]);

  // Lock body scroll + close on Escape while the modal is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  function selectDay(day: DayOption) {
    if (day.closed || day.key === selectedDay?.key) return;
    setSelectedDay(day);
    setSelectedSlot(null);
    setSlots([]);
    setAvailability("checking");
  }

  function handleSubmit() {
    setRequest("submitting");
    setTimeout(() => setRequest("confirmed"), 900);
  }

  const whatsappFallback = whatsappUrl(
    appointmentRequestMessage({
      treatment: treatment.title,
      date: selectedDay?.label,
      time: selectedSlot ?? undefined,
      name,
      phone,
    }),
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${treatment.title}`}
    >
      <button
        type="button"
        aria-label="Close booking dialog"
        onClick={onClose}
        className="absolute inset-0 bg-canvas-deep/80 backdrop-blur-sm modal-fade"
      />

      <div
        ref={dialogRef}
        className="glass-strong modal-pop relative z-10 flex max-h-[calc(100svh-2rem)] w-full max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[20px] sm:max-h-[92svh] sm:max-w-lg sm:rounded-[28px]"
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-green px-4 py-4 sm:px-6 sm:py-6">
          <div
            className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl"
            aria-hidden
          />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/15 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-on-primary sm:px-3 sm:py-1 sm:text-[0.7rem]">
                <Icon name="local_hospital" className="text-[0.85rem] sm:text-[0.95rem]" />
                In-clinic treatment
              </span>
              <h3 className="mt-2 font-display text-[1.15rem] font-bold leading-tight text-on-primary sm:mt-3 sm:text-[1.4rem]">
                {treatment.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="state-layer flex size-9 shrink-0 items-center justify-center rounded-full bg-black/15 text-on-primary transition-colors hover:bg-black/25"
            >
              <Icon name="close" className="relative z-10 text-[1.25rem]" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          {request === "confirmed" ? (
            <ConfirmationView
              treatmentTitle={treatment.title}
              date={selectedDay?.label}
              time={selectedSlot}
              whatsappFallback={whatsappFallback}
              onClose={onClose}
            />
          ) : (
            <>
              {/* Step 1 — choose a date */}
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/25 text-[0.72rem] font-bold text-primary-hover">
                  1
                </span>
                <p className="text-[0.88rem] font-medium text-ink sm:text-[0.95rem]">
                  Choose a date
                </p>
              </div>
              <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1.5 sm:mt-4 sm:gap-2 sm:pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {days.map((d) => {
                  const isActive = selectedDay?.key === d.key;
                  return (
                    <button
                      key={d.key}
                      type="button"
                      disabled={d.closed}
                      onClick={() => selectDay(d)}
                      className={`flex min-w-[56px] shrink-0 flex-col items-center gap-0.5 rounded-xl border px-2.5 py-2 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] sm:min-w-[64px] sm:rounded-2xl sm:px-3 sm:py-2.5 ${
                        isActive
                          ? "border-primary-hover bg-primary text-on-primary"
                          : d.closed
                            ? "cursor-not-allowed border-hairline bg-transparent text-muted/40"
                            : "border-hairline bg-surface/40 text-ink hover:border-primary-hover/50"
                      }`}
                    >
                      <span className="text-[0.7rem] uppercase tracking-wide opacity-80">
                        {d.weekday}
                      </span>
                      <span className="font-display text-[1rem] font-bold leading-none sm:text-[1.15rem]">
                        {d.day}
                      </span>
                      <span className="text-[0.65rem] opacity-70">
                        {d.closed ? "Closed" : d.month}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Step 2 — availability + time slots */}
              <div className="mt-5 flex items-center gap-2 sm:mt-7">
                <span
                  className={`flex size-6 items-center justify-center rounded-full text-[0.72rem] font-bold transition-colors ${
                    selectedDay
                      ? "bg-primary/25 text-primary-hover"
                      : "bg-surface text-muted/60"
                  }`}
                >
                  2
                </span>
                <p
                  className={`text-[0.88rem] font-medium transition-colors sm:text-[0.95rem] ${
                    selectedDay ? "text-ink" : "text-muted/60"
                  }`}
                >
                  Pick a time slot
                </p>
              </div>

              <div className="mt-3 min-h-[72px] sm:mt-4 sm:min-h-[96px]">
                {!selectedDay && (
                  <p className="rounded-xl border border-dashed border-hairline px-3 py-4 text-center text-[0.8rem] text-muted sm:rounded-2xl sm:px-4 sm:py-6 sm:text-[0.85rem]">
                    Select a date above to check available appointment times.
                  </p>
                )}

                {selectedDay && availability === "checking" && (
                  <div className="flex items-center justify-center gap-3 rounded-xl border border-hairline bg-surface/30 px-3 py-5 text-[0.82rem] text-muted sm:rounded-2xl sm:px-4 sm:py-7 sm:text-[0.88rem]">
                    <span className="size-4 animate-spin rounded-full border-2 border-primary-hover/30 border-t-primary-hover" />
                    Checking availability…
                  </div>
                )}

                {selectedDay && availability === "none" && (
                  <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-hairline bg-surface/30 px-4 py-6 text-center">
                    <Icon
                      name="event_busy"
                      className="text-[1.6rem] text-muted"
                    />
                    <p className="text-[0.88rem] font-medium text-ink">
                      No openings on {selectedDay.label}
                    </p>
                    <p className="text-[0.8rem] text-muted">
                      Please try another date.
                    </p>
                  </div>
                )}

                {selectedDay && availability === "available" && (
                  <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 sm:gap-2">
                    {BASE_SLOTS.map((slot) => {
                      const isOpen = slots.includes(slot);
                      const isActive = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={!isOpen}
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-lg border px-1.5 py-2 text-[0.72rem] font-medium transition-all duration-200 sm:rounded-xl sm:px-2 sm:py-2.5 sm:text-[0.8rem] ${
                            isActive
                              ? "border-primary-hover bg-primary text-on-primary"
                              : isOpen
                                ? "border-hairline bg-surface/40 text-ink hover:border-primary-hover/50"
                                : "cursor-not-allowed border-transparent bg-surface/20 text-muted/35 line-through"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Step 3 — contact details */}
              <div className="mt-5 flex items-center gap-2 sm:mt-7">
                <span
                  className={`flex size-6 items-center justify-center rounded-full text-[0.72rem] font-bold transition-colors ${
                    selectedSlot
                      ? "bg-primary/25 text-primary-hover"
                      : "bg-surface text-muted/60"
                  }`}
                >
                  3
                </span>
                <p
                  className={`text-[0.88rem] font-medium transition-colors sm:text-[0.95rem] ${
                    selectedSlot ? "text-ink" : "text-muted/60"
                  }`}
                >
                  Your details{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </p>
              </div>
              <div className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3 sm:grid-cols-2">
                <label className="glass flex items-center gap-2 rounded-xl px-3 py-1 sm:px-4">
                  <Icon name="person" className="text-[1rem] text-muted sm:text-[1.1rem]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    aria-label="Full name"
                    disabled={!selectedSlot}
                    className="w-full bg-transparent py-2 text-[0.85rem] text-ink placeholder:text-muted/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:py-2.5 sm:text-[0.9rem]"
                  />
                </label>
                <label className="glass flex items-center gap-2 rounded-xl px-3 py-1 sm:px-4">
                  <Icon name="call" className="text-[1rem] text-muted sm:text-[1.1rem]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    aria-label="Phone number"
                    disabled={!selectedSlot}
                    className="w-full bg-transparent py-2 text-[0.85rem] text-ink placeholder:text-muted/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:py-2.5 sm:text-[0.9rem]"
                  />
                </label>
              </div>
            </>
          )}
        </div>

        {/* Footer / action */}
        {request !== "confirmed" && (
          <div className="shrink-0 border-t border-hairline bg-canvas-deep/40 px-4 py-3 sm:px-6 sm:py-4">
            {selectedSlot && (
              <p className="mb-2 flex items-center justify-center gap-1.5 text-center text-[0.78rem] text-muted sm:mb-3 sm:text-[0.82rem]">
                <Icon
                  name="event_available"
                  className="text-[1.05rem] text-primary-hover"
                />
                {selectedDay?.label} · {selectedSlot}
              </p>
            )}
            <button
              type="button"
              disabled={!selectedSlot || request === "submitting"}
              onClick={handleSubmit}
              className="state-layer ripple inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[0.9rem] font-medium text-on-primary transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(46,139,122,0.6)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:min-h-[50px] sm:px-7 sm:text-[0.95rem]"
            >
              {request === "submitting" ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-on-primary/40 border-t-on-primary" />
                  <span className="relative z-10">Sending request…</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Request appointment</span>
                  <Icon
                    name="arrow_forward"
                    className="relative z-10 text-[1.15rem]"
                  />
                </>
              )}
            </button>
            <p className="mt-2 text-center text-[0.68rem] leading-relaxed text-muted/70 sm:mt-2.5 sm:text-[0.72rem]">
              This is a request, not a confirmed booking. Our team will verify
              availability and confirm your appointment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ConfirmationView({
  treatmentTitle,
  date,
  time,
  whatsappFallback,
  onClose,
}: {
  treatmentTitle: string;
  date?: string;
  time: string | null;
  whatsappFallback: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-2 text-center sm:py-4">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/20 sm:size-16">
        <Icon
          name="check_circle"
          fill
          className="text-[1.9rem] text-primary-hover sm:text-[2.2rem]"
        />
      </span>
      <h4 className="mt-4 font-display text-[1.2rem] font-bold text-ink sm:mt-5 sm:text-[1.4rem]">
        Appointment requested
      </h4>
      <p className="mt-2 max-w-sm text-[0.85rem] leading-relaxed text-muted sm:text-[0.9rem]">
        Thanks! We&rsquo;ve received your request and our team will reach out
        shortly to confirm your appointment.
      </p>

      <div className="mt-4 w-full rounded-xl border border-hairline bg-surface/40 p-4 text-left sm:mt-6 sm:rounded-2xl sm:p-5">
        <Detail icon="medical_services" label="Treatment" value={treatmentTitle} />
        {date && <Detail icon="calendar_month" label="Date" value={date} />}
        {time && <Detail icon="schedule" label="Time" value={time} />}
        <div className="mt-3 flex items-center gap-2 border-t border-hairline pt-3">
          <span className="flex size-6 items-center justify-center rounded-full bg-amber-400/15">
            <Icon name="pending" className="text-[0.95rem] text-gold" />
          </span>
          <span className="text-[0.82rem] font-medium text-gold">
            Pending confirmation
          </span>
        </div>
      </div>

      <a
        href={whatsappFallback}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-[0.85rem] font-medium text-primary-hover transition-colors hover:text-primary"
      >
        <Icon name="chat" className="text-[1.1rem]" />
        Send these details on WhatsApp too
      </a>

      <button
        type="button"
        onClick={onClose}
        className="state-layer mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-full border border-ink/20 px-6 text-[0.85rem] font-medium text-ink transition-colors hover:border-ink/40 sm:mt-6 sm:min-h-[46px] sm:px-7 sm:text-[0.9rem]"
      >
        <span className="relative z-10">Done</span>
      </button>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <Icon name={icon} className="text-[1.15rem] text-muted" />
      <span className="w-20 shrink-0 text-[0.78rem] uppercase tracking-wide text-muted">
        {label}
      </span>
      <span className="text-[0.88rem] font-medium text-ink">{value}</span>
    </div>
  );
}
