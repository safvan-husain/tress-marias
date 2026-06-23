import Image from "next/image";
import Icon from "./Icon";

const quotes = [
  {
    text: "The guidance feels personal — like it actually knows what I need on a hard day.",
    name: "Daniel R.",
    role: "Member · 1 year",
  },
  {
    text: "I finally found a rhythm I can keep. Calm mornings, better sleep, steadier mind.",
    name: "Amara K.",
    role: "Member · 8 months",
  },
];

export default function Community() {
  return (
    <section id="community" className="relative py-[110px]">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:px-10">
        {/* Left — image with floating proof */}
        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[24px] image-fade card-lift">
          <Image
            src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1400&q=90"
            alt="A person sitting peacefully by still water at golden hour"
            fill
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover"
          />

          <div className="glass absolute bottom-6 left-6 z-10 max-w-xs rounded-[18px] p-5">
            <Icon name="format_quote" className="text-[1.6rem] text-gold" />
            <p className="mt-1 text-[0.95rem] italic leading-relaxed text-ink">
              This community helped me stay consistent with my wellness journey.
            </p>
            <p className="mt-3 text-[0.78rem] font-medium tracking-wide text-muted">
              Sarah M. · Yoga Enthusiast
            </p>
          </div>

          <div className="glass-strong absolute right-6 top-6 z-10 rounded-[16px] px-5 py-4 text-center">
            <p className="font-display text-[1.9rem] font-extrabold leading-none text-gold">
              10k+
            </p>
            <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-muted">
              Members trained
            </p>
          </div>
        </div>

        {/* Right — copy + testimonials */}
        <div>
          <p className="reveal eyebrow mb-5">Community</p>
          <h2 className="reveal font-display text-[2.5rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-[3rem]">
            A circle that moves
            <span className="italic text-gold"> with you</span>
          </h2>
          <p
            className="reveal mt-6 text-[1.02rem] leading-[1.75] text-muted"
            data-reveal-delay="80"
          >
            Thousands of people practicing together — sharing progress,
            encouragement, and quiet wins along the way.
          </p>

          <div className="mt-8 space-y-4">
            {quotes.map((q, i) => (
              <div
                key={q.name}
                className="reveal glass card-lift rounded-[18px] p-5"
                data-reveal-delay={`${120 + i * 80}`}
              >
                <div className="mb-2 flex items-center gap-0.5 text-gold">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Icon key={s} name="star" fill className="text-[0.8rem]" />
                  ))}
                </div>
                <p className="text-[0.95rem] italic leading-relaxed text-ink">
                  &ldquo;{q.text}&rdquo;
                </p>
                <p className="mt-3 text-[0.78rem] font-medium tracking-wide text-muted">
                  {q.name} · {q.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
