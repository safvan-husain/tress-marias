import Image from "next/image";
import Icon from "./Icon";

type Service = {
  title: string;
  text: string;
  image: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
  blurb: string;
  services: Service[];
};

const categories: Category[] = [
  {
    id: "nails",
    name: "Nail Care",
    icon: "back_hand",
    blurb: "Manicures, pedicures, extensions, and art for healthy, polished hands and feet.",
    services: [
      {
        title: "Classic Manicure & Pedicure",
        text: "Nail trimming, shaping, cuticle care, cleaning, and regular polish to keep hands and feet neat, healthy, and well-groomed.",
        image: "photo-1610992015732-2449b76344bc",
      },
      {
        title: "Gel Manicure & Pedicure",
        text: "Long-lasting premium gel polish cured under an LED/UV lamp for a glossy, chip-resistant finish that lasts up to 2–3 weeks.",
        image: "photo-1607779097040-26e80aa78e66",
      },
      {
        title: "Spa Manicure & Pedicure",
        text: "A luxurious treatment with soaking, exfoliation, callus removal, a moisturizing mask, and a relaxing hand or foot massage.",
        image: "photo-1522337660859-02fbefca4702",
      },
      {
        title: "Nail Extensions",
        text: "Acrylic or gel extensions that add length, strength, and elegance — customized to your preferred shape and style.",
        image: "photo-1519014816548-bf5fe059798b",
      },
      {
        title: "Nail Art",
        text: "Custom patterns, embellishments, stones, decals, and artistic detailing to enhance the appearance of your nails.",
        image: "photo-1604654894610-df63bc536371",
      },
    ],
  },
  {
    id: "hair",
    name: "Hair Care & Styling",
    icon: "content_cut",
    blurb: "Cuts, color, treatments, and event styling tailored to your look and lifestyle.",
    services: [
      {
        title: "Haircut & Blow-Dry",
        text: "A tailored cut suited to your features and lifestyle, finished with blow-drying and styling for a polished look.",
        image: "photo-1562322140-8baeececf3df",
      },
      {
        title: "Hair Coloring & Highlights",
        text: "Full color, root touch-ups, gray coverage, highlights, lowlights, balayage, and customized color enhancement.",
        image: "photo-1554519934-e32b1629d9ee",
      },
      {
        title: "Hair Treatment",
        text: "Deep conditioning and restorative treatments — including keratin, hair botox, and intensive conditioning — to nourish and repair.",
        image: "photo-1595476108010-b4d1f102b1b1",
      },
      {
        title: "Hair Rebonding & Smoothing",
        text: "Advanced straightening and smoothing that reduces frizz and creates sleek, shiny, long-lasting results.",
        image: "photo-1524504388940-b1c1722653e1",
      },
      {
        title: "Event Hairstyling",
        text: "Updos, curls, braids, and formal styling for weddings, birthdays, corporate events, photoshoots, and special occasions.",
        image: "photo-1560869713-7d0a29430803",
      },
    ],
  },
  {
    id: "massage",
    name: "Massage & Body Wellness",
    icon: "spa",
    blurb: "Therapeutic and relaxing massages to ease tension and restore balance.",
    services: [
      {
        title: "Swedish Massage",
        text: "A relaxing full-body massage using smooth, flowing strokes and therapeutic oils to ease stress and improve circulation.",
        image: "photo-1544161515-4ab6ce6db874",
      },
      {
        title: "Deep Tissue Massage",
        text: "Targets deeper layers of muscle and connective tissue to relieve chronic tension, stiffness, and discomfort.",
        image: "photo-1519823551278-64ac92734fb1",
      },
      {
        title: "Thai Massage",
        text: "Assisted stretching, acupressure, and body movement to improve flexibility, balance, and energy flow.",
        image: "photo-1611073615830-9f76902c10fe",
      },
      {
        title: "Shiatsu Massage",
        text: "A Japanese technique using finger pressure on key points to relieve tension and support overall wellness.",
        image: "photo-1542848284-8afa78a08ccb",
      },
      {
        title: "Foot Reflexology",
        text: "Pressure-point massage on the feet and lower legs to promote relaxation and overall body balance.",
        image: "photo-1519415510236-718bdfcd89c8",
      },
    ],
  },
  {
    id: "makeup",
    name: "Beauty & Makeup",
    icon: "brush",
    blurb: "From everyday looks to full bridal glam, applied for any occasion.",
    services: [
      {
        title: "Casual / Day Makeup",
        text: "Light, natural-looking makeup for daily wear, business meetings, photoshoots, and daytime events.",
        image: "photo-1696710869375-0ef8272dfc97",
      },
      {
        title: "Glam / Evening Makeup",
        text: "Defined, sophisticated makeup with contouring, highlighting, dramatic eyes, and long-lasting finishes for evenings.",
        image: "photo-1487412947147-5cebf100ffc2",
      },
      {
        title: "Bridal Makeup Package",
        text: "A complete bridal service with consultation, trial session, wedding-day application, and optional looks for your entourage.",
        image: "photo-1774660810791-ffabcc531009",
      },
    ],
  },
  {
    id: "lashes",
    name: "Eyelash Services",
    icon: "visibility",
    blurb: "Extensions and lifts for fuller, more captivating lashes.",
    services: [
      {
        title: "Classic Eyelash Extensions",
        text: "Individual extensions applied for a natural, elegant, and fuller lash appearance.",
        image: "photo-1639629509821-c54cdd984227",
      },
      {
        title: "Volume Eyelash Extensions",
        text: "Multiple lightweight extensions per natural lash for a fuller, more dramatic, glamorous look.",
        image: "photo-1674049406467-824ea37c7184",
      },
      {
        title: "Hybrid Eyelash Extensions",
        text: "A custom blend of classic and volume techniques for the perfect balance of natural and dramatic.",
        image: "photo-1674049406179-d7bf2c263e71",
      },
      {
        title: "Lash Lift & Tint",
        text: "A semi-permanent lift, curl, and tint for longer, fuller-looking lashes without extensions.",
        image: "photo-1718720410614-bbb6bd57e2c9",
      },
    ],
  },
  {
    id: "brows",
    name: "Eyebrow Services",
    icon: "face",
    blurb: "Shaping, tinting, and enhancement for defined, beautifully groomed brows.",
    services: [
      {
        title: "Eyebrow Threading",
        text: "Precise cotton-thread shaping to define brows while keeping a clean, natural appearance.",
        image: "photo-1665810384829-23aa29f87b42",
      },
      {
        title: "Eyebrow Waxing",
        text: "Professional shaping with high-quality wax to remove unwanted hair for well-defined brows.",
        image: "photo-1696192410531-dc179772a0e8",
      },
      {
        title: "Brow Lamination",
        text: "Restructures and sets brow hairs into a fuller, lifted, and well-groomed shape.",
        image: "photo-1733145818828-645fc7499ca5",
      },
      {
        title: "Brow Tinting",
        text: "Semi-permanent tint to enhance brow color, definition, and fullness for a naturally polished look.",
        image: "photo-1620508467736-0140acd17ce4",
      },
      {
        title: "Brow Enhancement (Microblading)",
        text: "Natural-looking hair strokes using specialized pigments to improve brow shape, fullness, and symmetry.",
        image: "photo-1581003250898-36050e78fcd3",
      },
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-[110px]">
      <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
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
              Beauty &amp; wellness, brought to your home
            </h2>
          </div>
          <p
            className="reveal text-[1.02rem] leading-[1.75] text-muted"
            data-reveal-delay="80"
          >
            A complete menu of professional nail, hair, massage, makeup, lash,
            and brow services — delivered in the comfort of your own space by our
            skilled specialists.
          </p>
        </div>

        {/* Category sections */}
        <div className="mt-16 space-y-24">
          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-28">
              <div
                className="reveal flex flex-col gap-3 border-b border-hairline pb-6 sm:flex-row sm:items-center sm:gap-5"
                data-reveal-delay="40"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/90">
                  <Icon name={cat.icon} className="text-[1.4rem] text-on-primary" />
                </span>
                <div>
                  <h3 className="font-display text-[1.7rem] font-bold leading-tight text-ink">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">
                    {cat.blurb}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.services.map((s, si) => (
                  <article
                    key={s.title}
                    className="reveal glass card-lift group flex flex-col overflow-hidden rounded-[20px]"
                    data-reveal-delay={`${si * 60}`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden image-fade">
                      <Image
                        src={`https://images.unsplash.com/${s.image}?auto=format&fit=crop&w=700&q=90`}
                        alt={s.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm">
                        <Icon name={cat.icon} className="text-[1.15rem] text-on-primary" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h4 className="font-display text-[1.2rem] font-bold leading-snug text-ink">
                        {s.title}
                      </h4>
                      <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted">
                        {s.text}
                      </p>
                      <a
                        href="#book"
                        className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-primary transition-colors group-hover:text-primary-deep"
                      >
                        Book this service
                        <Icon name="arrow_forward" className="text-[1.05rem]" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
