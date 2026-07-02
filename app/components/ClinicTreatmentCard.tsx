import Icon from "./Icon";
import type { ClinicTreatment } from "../data/services";

export default function ClinicTreatmentCard({
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

        <ul className="mt-4 mb-6 flex flex-wrap gap-1.5">
          {treatment.benefits.slice(0, 3).map((b) => (
            <li
              key={b}
              className="inline-flex items-center gap-1 rounded-full border border-hairline bg-surface/40 px-2.5 py-1 text-[0.72rem] text-muted"
            >
              <Icon name="check" className="text-[0.85rem] text-primary-hover" />
              {b}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onBook}
          className="state-layer ripple mt-auto inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-primary-hover/40 bg-primary/15 px-5 text-[0.85rem] font-medium text-primary-hover transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:border-primary-hover hover:bg-primary hover:text-on-primary"
        >
          <Icon name="event_available" className="relative z-10 text-[1.1rem]" />
          <span className="relative z-10">Check appointment availability</span>
        </button>
      </div>
    </article>
  );
}
