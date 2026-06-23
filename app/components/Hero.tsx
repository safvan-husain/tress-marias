import Image from "next/image";
import Icon from "./Icon";
import CategoryStrip from "./CategoryStrip";

const avatars = [
  "photo-1438761681033-6461ffad8d80",
  "photo-1494790108377-be9c29b29330",
  "photo-1500648767791-00dcc994a43e",
  "photo-1534528741775-53994a69daeb",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=90"
        alt="A person meditating in a calm, forested setting at dusk"
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
                <Icon name="eco" className="text-[1rem] text-ink" />
              </span>
              <span className="text-[0.82rem] font-medium tracking-wide text-ink">
                AI Wellness
              </span>
            </div>

            <h1 className="reveal font-display text-[3.25rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-[4rem] lg:text-[4.75rem]">
              Wellness, Made
              <br />
              Simple and
              <span className="italic text-gold"> Personal.</span>
            </h1>

            <p
              className="reveal mt-7 max-w-md text-[1.05rem] leading-[1.7] text-muted"
              data-reveal-delay="80"
            >
              Personalized practices powered by intelligent guidance — to help
              you move, breathe, and find stillness, every day.
            </p>

            <div
              className="reveal mt-9 flex flex-wrap items-center gap-3"
              data-reveal-delay="160"
            >
              <a
                href="#join"
                className="state-layer ripple inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-7 text-[0.95rem] font-medium text-ink transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(46,139,122,0.6)]"
              >
                <span className="relative z-10">Begin your journey</span>
                <Icon name="arrow_forward" className="relative z-10 text-[1.15rem]" />
              </a>
              <a
                href="#classes"
                className="state-layer ripple inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ink/25 px-7 text-[0.95rem] font-medium text-ink transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:border-ink/50"
              >
                <span className="relative z-10">Explore classes</span>
                <Icon name="play_arrow" className="relative z-10 text-[1.2rem]" />
              </a>
            </div>
          </div>

          {/* Right — social proof */}
          <div className="reveal lg:justify-self-end" data-reveal-delay="220">
            <div className="glass max-w-sm rounded-[20px] p-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {avatars.map((id) => (
                    <span
                      key={id}
                      className="relative size-9 overflow-hidden rounded-full border-2 border-surface"
                    >
                      <Image
                        src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=80&q=75`}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>
                <div className="leading-tight">
                  <p className="font-display text-[1.15rem] font-bold text-ink">
                    2.5k+{" "}
                    <span className="text-[0.95rem] font-medium text-gold">
                      (4.9)
                    </span>
                  </p>
                  <div className="flex items-center gap-0.5 text-gold">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Icon key={s} name="star" fill className="text-[0.85rem]" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[0.95rem] italic leading-relaxed text-muted">
                &ldquo;This community helped me stay consistent with my wellness
                journey — it changed how I move through my days.&rdquo;
              </p>
              <p className="mt-3 text-[0.8rem] font-medium tracking-wide text-ink/80">
                Sarah M. · Yoga Enthusiast
              </p>
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
