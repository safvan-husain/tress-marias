import Image from "next/image";

const stats = [
  { value: "10,000+", label: "Members thriving" },
  { value: "AI-Guided", label: "Personalized classes" },
  { value: "95%", label: "Satisfaction rate" },
];

export default function Stats() {
  return (
    <section id="about" className="relative py-[110px]">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-6 lg:grid-cols-[1fr_1.7fr] lg:items-center lg:px-10">
        {/* Left — intro + stats stack */}
        <div className="reveal">
          <p className="eyebrow mb-5">Why Tres Marias</p>
          <p className="text-[1.02rem] leading-[1.75] text-muted">
            We combine mindful practice with intelligent insight to support
            every stage of your wellness journey.
          </p>

          <div className="relative mt-8 h-44 w-full overflow-hidden rounded-[20px] image-fade card-lift">
            <Image
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=90"
              alt="Soft natural light over a calm wellness space"
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-cover"
            />
          </div>

          <dl className="mt-10 space-y-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-[2.75rem] font-extrabold leading-none text-ink">
                  {s.value}
                </dt>
                <dd className="mt-2 text-[0.82rem] uppercase tracking-[0.18em] text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — headline + wide image */}
        <div>
          <h2 className="reveal font-display text-[2.75rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-[3.25rem] lg:text-[3.5rem]">
            Your intelligent partner in modern wellbeing, built to help you
            <span className="italic text-gold"> thrive.</span>
          </h2>
          <p
            className="reveal mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-muted"
            data-reveal-delay="80"
          >
            Our system quietly learns your preferences, habits, and progress —
            then shapes each practice around the way you actually live. No
            noise, no pressure. Just the right guidance at the right moment.
          </p>

          <div
            className="reveal relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[24px] image-fade card-lift"
            data-reveal-delay="120"
          >
            <Image
              src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1600&q=90"
              alt="A woman practicing yoga outdoors at sunrise"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 z-10">
              <p className="font-display text-[1.5rem] font-bold text-ink">
                Mindful by design
              </p>
              <p className="text-[0.9rem] text-muted">
                Practices that adapt to your rhythm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
