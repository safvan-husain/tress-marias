import Image from "next/image";
import Icon from "./Icon";
import BookingForm from "./BookingForm";

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

          <BookingForm />
        </div>
      </div>
    </section>
  );
}
