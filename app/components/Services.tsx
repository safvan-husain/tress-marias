import Image from "next/image";
import Icon from "./Icon";

const services = [
  {
    title: "AI-Guided Sessions",
    text: "Adaptive classes that read your mood, energy, and intention to recommend exactly where to begin.",
    icon: "neurology",
    image: "photo-1545389336-cf090694435e",
  },
  {
    title: "Personalized Programs",
    text: "Multi-week journeys built around your goals — from deep rest to strength and flexibility.",
    icon: "calendar_month",
    image: "photo-1599901860904-17e6ed7083a0",
  },
  {
    title: "Sound & Breath Healing",
    text: "Immersive soundscapes and guided breathwork to settle the nervous system and quiet the mind.",
    icon: "graphic_eq",
    image: "photo-1591291621164-2c6367723315",
  },
  {
    title: "Mindful Community",
    text: "A calm, supportive circle that keeps you consistent and gently accountable, together.",
    icon: "diversity_1",
    image: "photo-1545205597-3d9d02c29597",
  },
];

export default function Services() {
  return (
    <section id="classes" className="relative py-[110px]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Header — asymmetric */}
        <div className="grid items-end gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="reveal">
            <p className="eyebrow mb-5">What we offer</p>
            <h2 className="font-display text-[2.5rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-[3rem] lg:text-[3.25rem]">
              Training for every level, goal, and lifestyle
            </h2>
          </div>
          <p
            className="reveal text-[1.02rem] leading-[1.75] text-muted"
            data-reveal-delay="80"
          >
            A curated library of wellness practices, enhanced by AI to match
            your mood, intentions, and daily energy — so you always know exactly
            where to begin.
          </p>
        </div>

        {/* Card grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="reveal glass card-lift group flex flex-col overflow-hidden rounded-[20px]"
              data-reveal-delay={`${i * 70}`}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden image-fade">
                <Image
                  src={`https://images.unsplash.com/${s.image}?auto=format&fit=crop&w=700&q=90`}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm">
                  <Icon name={s.icon} className="text-[1.3rem] text-ink" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[1.35rem] font-bold text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-muted">
                  {s.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-primary-hover transition-colors group-hover:text-gold">
                  Learn more
                  <Icon name="arrow_forward" className="text-[1.05rem]" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
