import Icon from "./Icon";
import { bookingMessage, whatsappUrl } from "../lib/whatsapp";

const whatsappBookingUrl = whatsappUrl(bookingMessage());

const columns = [
  {
    title: "Services",
    links: [
      { label: "Nail Care", href: "#nails" },
      { label: "Hair Care & Styling", href: "#hair" },
      { label: "Massage & Wellness", href: "#massage" },
      { label: "Beauty & Makeup", href: "#makeup" },
    ],
  },
  {
    title: "More Services",
    links: [
      { label: "Eyelash Services", href: "#lashes" },
      { label: "Eyebrow Services", href: "#brows" },
      { label: "Bridal Makeup", href: "#makeup" },
      { label: "Event Hairstyling", href: "#hair" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      { label: "Book Now", href: whatsappBookingUrl, external: true },
      { label: "All Services", href: "#services" },
      { label: "Contact Us", href: whatsappBookingUrl, external: true },
    ],
  },
];

const socials = [
  { icon: "public", label: "Website" },
  { icon: "photo_camera", label: "Instagram" },
  { icon: "chat", label: "Messenger" },
  { icon: "call", label: "Call us" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-canvas-deep">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/90">
                <Icon name="spa" className="text-[1.2rem] text-on-primary" />
              </span>
              <span className="font-display text-[1.35rem] font-bold tracking-tight">
                Tres Marias
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-muted">
              Beauty &amp; wellness home services — professional nail, hair,
              massage, makeup, lash, and brow care, brought to your door.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="state-layer flex size-10 items-center justify-center rounded-full border border-hairline text-muted transition-colors duration-300 hover:text-ink"
                >
                  <Icon name={s.icon} className="relative z-10 text-[1.2rem]" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group inline-flex items-center text-[0.92rem] text-muted transition-colors duration-300 hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-7 text-[0.82rem] text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Tres Marias Beauty &amp; Wellness. All rights reserved.</p>
          <p className="text-muted/60">
            developed by{" "}
            <a
              href="https://blizmedia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-muted transition-colors duration-300 hover:text-ink"
            >
              BLIZ MEDIA LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
