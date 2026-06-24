import Image from "next/image";
import Icon from "./Icon";
import CategoryStrip from "./CategoryStrip";
import { bookingMessage, whatsappUrl } from "../lib/whatsapp";

const offerings = [
  { label: "Nail Care", icon: "back_hand", href: "#nails" },
  { label: "Hair Care & Styling", icon: "content_cut", href: "#hair" },
  { label: "Massage & Body Wellness", icon: "spa", href: "#massage" },
  { label: "Beauty & Makeup", icon: "brush", href: "#makeup" },
  { label: "Eyelash Services", icon: "visibility", href: "#lashes" },
  { label: "Eyebrow Services", icon: "face", href: "#brows" },
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
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,19,17,0.55) 0%, rgba(8,19,17,0.45) 35%, rgba(13,28,26,0.82) 100%), radial-gradient(120% 90% at 20% 30%, rgba(46,139,122,0.28), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-44 pt-32 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.7fr_1fr]">
          {/* Left — headline */}
          <div>
            <div className="reveal glass mb-7 inline-flex items-center gap-2 rounded-full py-2 pl-2 pr-4">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary">
                <Icon name="spa" className="text-[1rem] text-ink" />
              </span>
              <span className="text-[0.82rem] font-medium tracking-wide text-ink">
                Beauty &amp; Wellness · Home Service
              </span>
            </div>

            <h1 className="reveal-hero font-display text-[3.25rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-[4rem] lg:text-[4.75rem]">
              Salon-Quality Beauty,
              <br />
              In the Comfort of
              <span className="italic text-gold"> Home.</span>
            </h1>

            <p
              className="reveal mt-7 max-w-md text-[1.05rem] leading-[1.7] text-muted"
              data-reveal-delay="80"
            >
              Professional nail, hair, massage, makeup, lash, and brow services —
              booked on your schedule and brought right to your door.
            </p>

            <div
              className="reveal mt-9 flex flex-wrap items-center gap-3"
              data-reveal-delay="160"
            >
              <a
                href={whatsappUrl(bookingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="state-layer ripple inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-7 text-[0.95rem] font-medium text-ink transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(46,139,122,0.6)]"
              >
                <span className="relative z-10">Book a service</span>
                <Icon name="arrow_forward" className="relative z-10 text-[1.15rem]" />
              </a>
              <a
                href="#services"
                className="state-layer ripple inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ink/25 px-7 text-[0.95rem] font-medium text-ink transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:border-ink/50"
              >
                <span className="relative z-10">View services</span>
                <Icon name="arrow_downward" className="relative z-10 text-[1.2rem]" />
              </a>
            </div>
          </div>

          {/* Right — services overview */}
          <div className="reveal lg:justify-self-end" data-reveal-delay="220">
            <div className="glass w-full max-w-sm rounded-[20px] p-6">
              <p className="eyebrow mb-4">Our home services</p>
              <ul className="space-y-1">
                {offerings.map((o) => (
                  <li key={o.label}>
                    <a
                      href={o.href}
                      className="state-layer group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <Icon
                          name={o.icon}
                          className="relative z-10 text-[1.15rem] text-primary-hover"
                        />
                      </span>
                      <span className="relative z-10 flex-1 text-[0.95rem] font-medium text-ink">
                        {o.label}
                      </span>
                      <Icon
                        name="chevron_right"
                        className="relative z-10 text-[1.2rem] text-muted transition-transform group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Floating category strip */}
      <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center px-6">
        <div className="reveal" data-reveal-delay="280">
          <CategoryStrip />
        </div>
      </div>
    </section>
  );
}
