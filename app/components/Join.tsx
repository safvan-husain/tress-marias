import Image from "next/image";
import Icon from "./Icon";
import BookingForm from "./BookingForm";

export default function Join() {
  return (
    <section id="book" className="relative bg-canvas-light px-6 py-[90px] lg:px-10">
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
              "linear-gradient(180deg, rgba(8,19,17,0.9), rgba(8,19,17,0.95)), radial-gradient(90% 120% at 80% 10%, rgba(46,139,122,0.32), transparent 55%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-2xl px-6 py-20 text-center sm:py-24">
          <span className="glass mb-7 inline-flex items-center gap-2 rounded-full py-2 pl-2 pr-4">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary">
              <Icon name="calendar_month" className="text-[0.85rem] text-on-primary" />
            </span>
            <span className="text-[0.78rem] font-medium tracking-wide text-ink">
              Book your appointment
            </span>
          </span>

          <h2 className="font-display text-[2.75rem] font-bold leading-[1.08] tracking-tight text-ink sm:text-[3.5rem]">
            Bring the salon
            <span className="italic text-gold"> home</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[1.05rem] leading-[1.7] text-muted">
            Tell us the service you&rsquo;d like and your preferred time — our
            specialists arrive with everything needed to pamper you at your door.
          </p>

          <BookingForm />
        </div>
      </div>
    </section>
  );
}
