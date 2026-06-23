import Image from "next/image";
import Icon from "./Icon";
import Button from "./Button";

const small = [
  {
    title: "14-Day Beginner Reset",
    meta: "14 days · Beginner",
    text: "Kickstart your wellness journey with gentle daily practices designed for ease.",
    image: "photo-1506126613408-eca07ce68773",
  },
  {
    title: "30-Day Flexibility Challenge",
    meta: "30 days · Intermediate",
    text: "Enhance your flexibility with adaptive routines that track progress as you go.",
    image: "photo-1544367567-0f2fcb009e0b",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="relative py-[110px]">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 lg:grid-cols-[1fr_1.45fr] lg:items-center lg:px-10">
        {/* Left — copy */}
        <div className="reveal">
          <p className="eyebrow mb-5">Our programs</p>
          <h2 className="font-display text-[2.5rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-[3rem]">
            Discover tailored wellness
            <span className="italic text-gold"> programs</span>
          </h2>
          <p className="mt-6 max-w-md text-[1.05rem] leading-[1.75] text-muted">
            Structured paths built to match your mood, intentions, and daily
            energy — so progress always feels within reach.
          </p>
          <div className="mt-8">
            <Button href="#join">Browse all programs</Button>
          </div>
        </div>

        {/* Right — featured + small cards */}
        <div className="space-y-6">
          {/* Featured */}
          <article
            className="reveal glass card-lift relative aspect-[16/9] overflow-hidden rounded-[24px] image-fade"
            data-reveal-delay="80"
          >
            <Image
              src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1400&q=90"
              alt="A person in a focused meditation pose"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <span className="glass-strong absolute right-5 top-5 z-10 rounded-full px-3.5 py-1.5 text-[0.78rem] font-medium tracking-wide text-ink">
              6 weeks · All levels
            </span>
            <div className="absolute bottom-6 left-6 z-10 max-w-sm">
              <span className="mb-2 inline-flex size-9 items-center justify-center rounded-full bg-primary/90">
                <Icon name="bolt" className="text-[1.15rem] text-ink" />
              </span>
              <h3 className="font-display text-[1.65rem] font-bold text-ink">
                Core Strength Smart Program
              </h3>
              <p className="mt-1.5 text-[0.92rem] text-muted">
                Build core power with AI-tailored workouts that evolve as you
                improve and stay motivated.
              </p>
            </div>
          </article>

          {/* Two small */}
          <div className="grid gap-6 sm:grid-cols-2">
            {small.map((p, i) => (
              <article
                key={p.title}
                className="reveal glass card-lift group flex flex-col overflow-hidden rounded-[20px]"
                data-reveal-delay={`${120 + i * 70}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden image-fade">
                  <Image
                    src={`https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=700&q=90`}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 28vw"
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
                  />
                  <span className="glass-strong absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[0.72rem] font-medium tracking-wide text-ink">
                    {p.meta}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.2rem] font-bold leading-snug text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">
                    {p.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
