import Image from "next/image";
import Icon from "./Icon";
import CategoryStrip from "./CategoryStrip";
import { bookingMessage, whatsappUrl } from "../lib/whatsapp";

const worlds = [
  {
    label: "At Home",
    icon: "home_health",
    desc: "Nails, hair, massage, makeup, lashes & brows at your location.",
    href: "#at-home",
  },
  {
    label: "In Clinic",
    icon: "local_hospital",
    desc: "Skin, anti-aging, injectables, rejuvenation & body treatments.",
    href: "#in-clinic",
  },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1610402601271-5b4bd5b3eba4?auto=format&fit=crop&w=2000&q=90"
        alt="A relaxing hot-stone massage treatment in a calm spa setting"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="hero-overlay absolute inset-0" aria-hidden />
      <div className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-[5]" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-44 pt-32 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <div className="reveal glass mb-7 inline-flex items-center gap-2 rounded-full py-2 pl-2 pr-4">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary">
                <Icon name="spa" className="text-[1rem] text-on-primary" />
              </span>
              <span className="text-[0.82rem] font-medium tracking-wide text-ink">
                Home Service · Aesthetic Clinic
              </span>
            </div>

            <h1 className="reveal-hero font-display text-[3.25rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-[4rem] lg:text-[4.75rem]">
              Beauty at home.
              <br />
              Advanced aesthetics
              <span className="italic text-gold"> in clinic.</span>
            </h1>

            <p
              className="reveal mt-7 max-w-md text-[1.05rem] leading-[1.7] text-muted"
              data-reveal-delay="80"
            >
              From salon-quality nails, hair, and massage at your door to
              advanced skin and anti-aging treatments at our clinic — choose the
              care that fits you.
            </p>

            <div
              className="reveal mt-9 flex flex-wrap items-center gap-3"
              data-reveal-delay="160"
            >
              <a
                href={whatsappUrl(bookingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="state-layer ripple inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-7 text-[0.95rem] font-medium text-on-primary transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(46,139,122,0.6)]"
              >
                <Icon name="home_health" className="relative z-10 text-[1.15rem]" />
                <span className="relative z-10">Book Home Service</span>
              </a>
              <a
                href="#in-clinic"
                className="state-layer ripple inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ink/25 px-7 text-[0.95rem] font-medium text-ink transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:border-ink/50"
              >
                <Icon name="local_hospital" className="relative z-10 text-[1.2rem]" />
                <span className="relative z-10">Explore Clinic Treatments</span>
              </a>
            </div>
          </div>

          <div className="reveal lg:justify-self-end" data-reveal-delay="220">
            <div className="glass w-full max-w-sm rounded-[20px] p-6">
              <p className="eyebrow mb-4">Two ways to be cared for</p>
              <ul className="space-y-2.5">
                {worlds.map((w) => (
                  <li key={w.label}>
                    <a
                      href={w.href}
                      className="state-layer group flex items-start gap-3 rounded-2xl border border-hairline bg-surface/30 p-3.5 transition-colors hover:border-primary-hover/40"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <Icon
                          name={w.icon}
                          className="relative z-10 text-[1.2rem] text-primary-hover"
                        />
                      </span>
                      <span className="relative z-10 flex-1">
                        <span className="flex items-center justify-between">
                          <span className="text-[0.98rem] font-semibold text-ink">
                            {w.label}
                          </span>
                          <Icon
                            name="chevron_right"
                            className="text-[1.2rem] text-muted transition-transform group-hover:translate-x-0.5"
                          />
                        </span>
                        <span className="mt-0.5 block text-[0.82rem] leading-snug text-muted">
                          {w.desc}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#concern"
                className="state-layer mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-2xl px-3 py-2.5 text-[0.85rem] font-medium text-primary-hover transition-colors hover:text-primary"
              >
                <Icon name="quiz" className="relative z-10 text-[1.1rem]" />
                <span className="relative z-10">Not sure? Help me choose</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center px-6">
        <div className="reveal" data-reveal-delay="280">
          <CategoryStrip />
        </div>
      </div>
    </section>
  );
}
