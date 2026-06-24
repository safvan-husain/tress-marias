import Icon from "./Icon";

type Service = {
  title: string;
  text: string;
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
      },
      {
        title: "Gel Manicure & Pedicure",
        text: "Long-lasting premium gel polish cured under an LED/UV lamp for a glossy, chip-resistant finish that lasts up to 2–3 weeks.",
      },
      {
        title: "Spa Manicure & Pedicure",
        text: "A luxurious treatment with soaking, exfoliation, callus removal, a moisturizing mask, and a relaxing hand or foot massage.",
      },
      {
        title: "Nail Extensions",
        text: "Acrylic or gel extensions that add length, strength, and elegance — customized to your preferred shape and style.",
      },
      {
        title: "Nail Art",
        text: "Custom patterns, embellishments, stones, decals, and artistic detailing to enhance the appearance of your nails.",
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
      },
      {
        title: "Hair Coloring & Highlights",
        text: "Full color, root touch-ups, gray coverage, highlights, lowlights, balayage, and customized color enhancement.",
      },
      {
        title: "Hair Treatment",
        text: "Deep conditioning and restorative treatments — including keratin, hair botox, and intensive conditioning — to nourish and repair.",
      },
      {
        title: "Hair Rebonding & Smoothing",
        text: "Advanced straightening and smoothing that reduces frizz and creates sleek, shiny, long-lasting results.",
      },
      {
        title: "Event Hairstyling",
        text: "Updos, curls, braids, and formal styling for weddings, birthdays, corporate events, photoshoots, and special occasions.",
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
      },
      {
        title: "Deep Tissue Massage",
        text: "Targets deeper layers of muscle and connective tissue to relieve chronic tension, stiffness, and discomfort.",
      },
      {
        title: "Thai Massage",
        text: "Assisted stretching, acupressure, and body movement to improve flexibility, balance, and energy flow.",
      },
      {
        title: "Shiatsu Massage",
        text: "A Japanese technique using finger pressure on key points to relieve tension and support overall wellness.",
      },
      {
        title: "Foot Reflexology",
        text: "Pressure-point massage on the feet and lower legs to promote relaxation and overall body balance.",
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
      },
      {
        title: "Glam / Evening Makeup",
        text: "Defined, sophisticated makeup with contouring, highlighting, dramatic eyes, and long-lasting finishes for evenings.",
      },
      {
        title: "Bridal Makeup Package",
        text: "A complete bridal service with consultation, trial session, wedding-day application, and optional looks for your entourage.",
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
      },
      {
        title: "Volume Eyelash Extensions",
        text: "Multiple lightweight extensions per natural lash for a fuller, more dramatic, glamorous look.",
      },
      {
        title: "Hybrid Eyelash Extensions",
        text: "A custom blend of classic and volume techniques for the perfect balance of natural and dramatic.",
      },
      {
        title: "Lash Lift & Tint",
        text: "A semi-permanent lift, curl, and tint for longer, fuller-looking lashes without extensions.",
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
      },
      {
        title: "Eyebrow Waxing",
        text: "Professional shaping with high-quality wax to remove unwanted hair for well-defined brows.",
      },
      {
        title: "Brow Lamination",
        text: "Restructures and sets brow hairs into a fuller, lifted, and well-groomed shape.",
      },
      {
        title: "Brow Tinting",
        text: "Semi-permanent tint to enhance brow color, definition, and fullness for a naturally polished look.",
      },
      {
        title: "Brow Enhancement (Microblading)",
        text: "Natural-looking hair strokes using specialized pigments to improve brow shape, fullness, and symmetry.",
      },
    ],
  },
];

export default function Services() {
  return (
    <section id="classes" className="relative py-[110px]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
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
        <div className="mt-16 space-y-20">
          {categories.map((cat, ci) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-28">
              <div
                className="reveal flex flex-col gap-3 border-b border-hairline pb-6 sm:flex-row sm:items-center sm:gap-5"
                data-reveal-delay="40"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/90">
                  <Icon name={cat.icon} className="text-[1.4rem] text-ink" />
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

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cat.services.map((s, si) => (
                  <article
                    key={s.title}
                    className="reveal glass card-lift flex flex-col rounded-[20px] p-6"
                    data-reveal-delay={`${ci * 30 + si * 50}`}
                  >
                    <h4 className="font-display text-[1.2rem] font-bold leading-snug text-ink">
                      {s.title}
                    </h4>
                    <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted">
                      {s.text}
                    </p>
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
