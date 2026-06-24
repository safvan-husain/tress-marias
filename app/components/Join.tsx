import Image from "next/image";
import Icon from "./Icon";

export default function Join() {
  return (
    <section id="book" className="relative bg-gradient-soft px-6 py-[90px] lg:px-10">
      <div className="reveal relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px]">
        <Image
          src="https://images.unsplash.com/photo-1543134968-8752069dbf58?auto=format&fit=crop&w=2000&q=90"
          alt="Delicate flowers floating in water at a serene spa"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(125deg, rgba(26,107,92,0.92) 0%, rgba(46,139,122,0.85) 35%, rgba(78,205,180,0.7) 65%, rgba(255,255,255,0.88) 100%), radial-gradient(ellipse 80% 60% at 15% 20%, rgba(255,255,255,0.2), transparent 50%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-2xl px-6 py-20 text-center sm:py-24">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 py-2 pl-2 pr-4 backdrop-blur-md">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary">
              <Icon name="calendar_month" className="text-[0.85rem] text-on-primary" />
            </span>
            <span className="text-[0.78rem] font-medium tracking-wide text-on-primary">
              Book your appointment
            </span>
          </span>

          <h2 className="font-display text-[2.75rem] font-bold leading-[1.08] tracking-tight text-on-primary sm:text-[3.5rem]">
            Bring the salon
            <span className="italic text-white/90"> home</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[1.05rem] leading-[1.7] text-white/80">
            Tell us the service you&rsquo;d like and your preferred time — our
            specialists arrive with everything needed to pamper you at your door.
          </p>

          <form
            className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
            action="#"
          >
            <label className="glass flex flex-1 items-center gap-2 rounded-full px-5 py-1">
              <Icon name="mail" className="text-[1.2rem] text-muted" />
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address"
                className="w-full bg-transparent py-3 text-[0.95rem] text-ink placeholder:text-muted/70 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="state-layer ripple inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-ink px-7 text-[0.95rem] font-medium text-canvas transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(13,28,26,0.25)]"
            >
              <span className="relative z-10">Request a booking</span>
              <Icon name="arrow_forward" className="relative z-10 text-[1.15rem]" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
