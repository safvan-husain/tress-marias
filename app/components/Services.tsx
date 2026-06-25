import Link from "next/link";
import Icon from "./Icon";
import ServicesPreview from "./ServicesPreview";

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-canvas-deep py-[110px]"
    >
      <div className="pointer-events-none absolute inset-0 content-section-bg" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-32 h-80 w-80 rounded-full bg-primary-hover/12 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Header — asymmetric */}
        <div className="grid items-end gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="reveal">
            <p className="eyebrow mb-5">Our services</p>
            <h2 className="font-display text-[2.5rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-[3rem] lg:text-[3.25rem]">
              Beauty at home. Advanced aesthetics in clinic.
            </h2>
          </div>
          <div className="reveal" data-reveal-delay="80">
            <p className="text-[1.02rem] leading-[1.75] text-muted">
              Two ways to feel your best — professional beauty &amp; wellness
              brought to your home, and advanced medical aesthetics at our
              clinic. Here&rsquo;s a taste of each.
            </p>
            <Link
              href="/find"
              className="state-layer mt-4 inline-flex items-center gap-1.5 rounded-full text-[0.9rem] font-medium text-primary-hover transition-colors hover:text-primary"
            >
              <Icon name="quiz" className="relative z-10 text-[1.1rem]" />
              <span className="relative z-10">
                Not sure? Help me find the right service
              </span>
            </Link>
          </div>
        </div>

        <ServicesPreview />
      </div>
    </section>
  );
}
