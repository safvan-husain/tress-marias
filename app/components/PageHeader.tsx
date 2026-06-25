import Link from "next/link";
import Icon from "./Icon";

type CrossLink = {
  label: string;
  href: string;
  icon: string;
};

export default function PageHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  crossLinks = [],
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  crossLinks?: CrossLink[];
}) {
  return (
    <div className="relative overflow-hidden bg-canvas-deep px-6 pb-16 pt-32 lg:px-10 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px]">
        <Link
          href="/"
          className="state-layer inline-flex items-center gap-1.5 rounded-full text-[0.85rem] font-medium text-muted transition-colors hover:text-ink"
        >
          <Icon name="arrow_back" className="relative z-10 text-[1.1rem]" />
          <span className="relative z-10">Back to home</span>
        </Link>

        <div className="mt-7 max-w-2xl">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="font-display text-[2.5rem] font-bold leading-[1.08] tracking-tight text-ink sm:text-[3rem] lg:text-[3.5rem]">
            {title}
            {titleAccent && <span className="italic text-gold"> {titleAccent}</span>}
          </h1>
          <p className="mt-5 text-[1.05rem] leading-[1.7] text-muted">
            {description}
          </p>
        </div>

        {crossLinks.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {crossLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="state-layer inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/20 px-5 text-[0.9rem] font-medium text-ink transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:border-ink/45"
              >
                <Icon name={l.icon} className="relative z-10 text-[1.15rem]" />
                <span className="relative z-10">{l.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
