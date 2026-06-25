// Single source of truth for both worlds: at-home beauty/wellness services
// (booked via WhatsApp) and in-clinic aesthetic treatments (booked through the
// appointment-availability flow). Concern tags power the "Shop by concern"
// browser, which surfaces matching services across both worlds.

export type BookingMode = "home" | "clinic";

export type Concern = {
  id: string;
  label: string;
  icon: string;
};

export type HomeService = {
  title: string;
  text: string;
  image: string;
  concerns?: string[];
};

export type HomeCategory = {
  id: string;
  name: string;
  icon: string;
  blurb: string;
  services: HomeService[];
};

export type ClinicTreatment = {
  title: string;
  text: string;
  benefits: string[];
  concerns?: string[];
};

export type ClinicGroup = {
  id: string;
  name: string;
  icon: string;
  blurb: string;
  treatments: ClinicTreatment[];
};

// Outcome-led concerns, phrased the way a visitor thinks ("I want to improve…")
// rather than as clinical category names.
export const concerns: Concern[] = [
  { id: "dull-skin", label: "Dull skin", icon: "auto_awesome" },
  { id: "fine-lines", label: "Fine lines", icon: "face" },
  { id: "acne-scars", label: "Acne scars", icon: "blur_on" },
  { id: "pigmentation", label: "Pigmentation", icon: "gradient" },
  { id: "loose-skin", label: "Loose skin", icon: "bolt" },
  { id: "volume-loss", label: "Facial volume loss", icon: "deblur" },
  { id: "jawline", label: "Jawline definition", icon: "diamond" },
  { id: "under-eye", label: "Under-eye concerns", icon: "visibility" },
  { id: "event-beauty", label: "Bridal / event beauty", icon: "celebration" },
  { id: "relaxation", label: "Relaxation / body pain", icon: "spa" },
];

export const homeCategories: HomeCategory[] = [
  {
    id: "nails",
    name: "Nail Care",
    icon: "back_hand",
    blurb:
      "Manicures, pedicures, extensions, and art for healthy, polished hands and feet.",
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
        concerns: ["event-beauty"],
      },
      {
        title: "Spa Manicure & Pedicure",
        text: "A luxurious treatment with soaking, exfoliation, callus removal, a moisturizing mask, and a relaxing hand or foot massage.",
        image: "photo-1522337660859-02fbefca4702",
        concerns: ["relaxation"],
      },
      {
        title: "Nail Extensions",
        text: "Acrylic or gel extensions that add length, strength, and elegance — customized to your preferred shape and style.",
        image: "photo-1519014816548-bf5fe059798b",
        concerns: ["event-beauty"],
      },
      {
        title: "Nail Art",
        text: "Custom patterns, embellishments, stones, decals, and artistic detailing to enhance the appearance of your nails.",
        image: "photo-1604654894610-df63bc536371",
        concerns: ["event-beauty"],
      },
    ],
  },
  {
    id: "hair",
    name: "Hair Care & Styling",
    icon: "content_cut",
    blurb:
      "Cuts, color, treatments, and event styling tailored to your look and lifestyle.",
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
        concerns: ["event-beauty"],
      },
    ],
  },
  {
    id: "massage",
    name: "Massage & Body Wellness",
    icon: "spa",
    blurb:
      "Therapeutic and relaxing massages to ease tension and restore balance.",
    services: [
      {
        title: "Swedish Massage",
        text: "A relaxing full-body massage using smooth, flowing strokes and therapeutic oils to ease stress and improve circulation.",
        image: "photo-1544161515-4ab6ce6db874",
        concerns: ["relaxation"],
      },
      {
        title: "Deep Tissue Massage",
        text: "Targets deeper layers of muscle and connective tissue to relieve chronic tension, stiffness, and discomfort.",
        image: "photo-1519823551278-64ac92734fb1",
        concerns: ["relaxation"],
      },
      {
        title: "Thai Massage",
        text: "Assisted stretching, acupressure, and body movement to improve flexibility, balance, and energy flow.",
        image: "photo-1611073615830-9f76902c10fe",
        concerns: ["relaxation"],
      },
      {
        title: "Shiatsu Massage",
        text: "A Japanese technique using finger pressure on key points to relieve tension and support overall wellness.",
        image: "photo-1542848284-8afa78a08ccb",
        concerns: ["relaxation"],
      },
      {
        title: "Foot Reflexology",
        text: "Pressure-point massage on the feet and lower legs to promote relaxation and overall body balance.",
        image: "photo-1519415510236-718bdfcd89c8",
        concerns: ["relaxation"],
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
        concerns: ["event-beauty"],
      },
      {
        title: "Glam / Evening Makeup",
        text: "Defined, sophisticated makeup with contouring, highlighting, dramatic eyes, and long-lasting finishes for evenings.",
        image: "photo-1487412947147-5cebf100ffc2",
        concerns: ["event-beauty"],
      },
      {
        title: "Bridal Makeup Package",
        text: "A complete bridal service with consultation, trial session, wedding-day application, and optional looks for your entourage.",
        image: "photo-1774660810791-ffabcc531009",
        concerns: ["event-beauty"],
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
        concerns: ["event-beauty"],
      },
      {
        title: "Volume Eyelash Extensions",
        text: "Multiple lightweight extensions per natural lash for a fuller, more dramatic, glamorous look.",
        image: "photo-1674049406467-824ea37c7184",
        concerns: ["event-beauty"],
      },
      {
        title: "Hybrid Eyelash Extensions",
        text: "A custom blend of classic and volume techniques for the perfect balance of natural and dramatic.",
        image: "photo-1674049406179-d7bf2c263e71",
        concerns: ["event-beauty"],
      },
      {
        title: "Lash Lift & Tint",
        text: "A semi-permanent lift, curl, and tint for longer, fuller-looking lashes without extensions.",
        image: "photo-1718720410614-bbb6bd57e2c9",
        concerns: ["event-beauty"],
      },
    ],
  },
  {
    id: "brows",
    name: "Eyebrow Services",
    icon: "face",
    blurb:
      "Shaping, tinting, and enhancement for defined, beautifully groomed brows.",
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
        concerns: ["event-beauty"],
      },
      {
        title: "Brow Tinting",
        text: "Semi-permanent tint to enhance brow color, definition, and fullness for a naturally polished look.",
        image: "photo-1620508467736-0140acd17ce4",
        concerns: ["event-beauty"],
      },
      {
        title: "Brow Enhancement (Microblading)",
        text: "Natural-looking hair strokes using specialized pigments to improve brow shape, fullness, and symmetry.",
        image: "photo-1581003250898-36050e78fcd3",
        concerns: ["event-beauty"],
      },
    ],
  },
];

export const clinicGroups: ClinicGroup[] = [
  {
    id: "skin-glow",
    name: "Skin Glow & Texture",
    icon: "auto_awesome",
    blurb:
      "Medical-grade rejuvenation for radiant, hydrated, glass-skin clarity.",
    treatments: [
      {
        title: "HydraFacial Platinum",
        text: "The ultimate medical-grade facial — deep cleansing, exfoliation, extraction, hydration, and antioxidant infusion in one luxurious treatment.",
        benefits: [
          "Deep pore cleansing",
          "Instant hydration",
          "Brighter complexion",
          "No downtime",
        ],
        concerns: ["dull-skin", "event-beauty", "pigmentation"],
      },
      {
        title: "Exosome Skin Regeneration Therapy",
        text: "Advanced cellular-communication technology that accelerates skin renewal, evens tone, and creates the sought-after glass-skin effect.",
        benefits: [
          "Accelerates skin healing",
          "Improves texture and tone",
          "Reduces pigmentation and redness",
          "Supports collagen regeneration",
        ],
        concerns: ["dull-skin", "pigmentation", "acne-scars"],
      },
      {
        title: "Skin Booster Therapy",
        text: "Deep hydration with advanced hyaluronic acid formulations to improve skin quality, elasticity, and glow from within.",
        benefits: [
          "Deep hydration",
          "Improved texture",
          "Enhanced radiance",
          "Long-lasting glow",
        ],
        concerns: ["dull-skin", "fine-lines"],
      },
      {
        title: "Dermapen Microneedling with Skin Boosters",
        text: "Collagen-induction therapy creating microchannels so peptides, vitamins, and hyaluronic acid penetrate deeper for superior rejuvenation.",
        benefits: [
          "Improves acne scars",
          "Reduces enlarged pores",
          "Stimulates collagen",
          "Improves texture",
        ],
        concerns: ["dull-skin", "acne-scars", "fine-lines"],
      },
    ],
  },
  {
    id: "anti-aging",
    name: "Wrinkles & Anti-Aging",
    icon: "face",
    blurb:
      "Soften expression lines and restore youthful quality with regenerative and injectable care.",
    treatments: [
      {
        title: "Polynucleotide (PDRN / Salmon DNA) Therapy",
        text: "Highly purified DNA fragments stimulate skin repair, improve elasticity, brighten the under-eye area, and restore a youthful complexion.",
        benefits: [
          "Improves elasticity",
          "Reduces fine lines",
          "Enhances under-eye area",
          "Promotes natural collagen",
        ],
        concerns: ["fine-lines", "under-eye", "dull-skin"],
      },
      {
        title: "Full Face Botox",
        text: "A premium anti-wrinkle treatment that softens expression lines and prevents deeper wrinkles for a refreshed, natural-looking result.",
        benefits: [
          "Smooths forehead lines",
          "Softens frown lines",
          "Reduces crow's feet",
          "Preventive anti-aging",
        ],
        concerns: ["fine-lines"],
      },
      {
        title: "Baby Botox",
        text: "Micro-doses of Botox for subtle wrinkle prevention while maintaining natural facial movement — ideal for younger clients.",
        benefits: [
          "Natural-looking results",
          "Prevents wrinkle formation",
          "Maintains expressions",
          "Minimal downtime",
        ],
        concerns: ["fine-lines"],
      },
    ],
  },
  {
    id: "contouring",
    name: "Face Contouring",
    icon: "diamond",
    blurb:
      "Restore volume and sculpt balanced facial harmony with premium fillers.",
    treatments: [
      {
        title: "Premium Dermal Fillers",
        text: "Restore lost volume, enhance contours, and balance facial harmony with expertly placed, fully customized premium fillers.",
        benefits: [
          "Immediate visible results",
          "Restores facial volume",
          "Enhances definition",
          "Long-lasting outcomes",
        ],
        concerns: ["volume-loss", "jawline", "under-eye"],
      },
      {
        title: "Biostimulatory Fillers (Sculptra® & Radiesse®)",
        text: "Stimulate your body's own collagen production for gradual, natural-looking rejuvenation that can last for years.",
        benefits: [
          "Long-lasting collagen stimulation",
          "Improves firmness",
          "Restores facial structure",
          "Progressive results",
        ],
        concerns: ["volume-loss", "loose-skin"],
      },
      {
        title: "Facial Fat Grafting Consultation",
        text: "A restorative procedure that replenishes lost facial volume using your own fat for natural, long-lasting rejuvenation.",
        benefits: [
          "Natural facial restoration",
          "Improved contours",
          "Long-lasting results",
          "Enhanced harmony",
        ],
        concerns: ["volume-loss"],
      },
    ],
  },
  {
    id: "tightening",
    name: "Skin Tightening",
    icon: "bolt",
    blurb:
      "Non-surgical lifting and tightening that remodels collagen and redefines contours.",
    treatments: [
      {
        title: "Morpheus8 Radiofrequency Microneedling",
        text: "Combines microneedling with radiofrequency energy to remodel collagen, tighten skin, refine contours, and reduce acne scarring.",
        benefits: [
          "Tightens loose skin",
          "Improves jawline definition",
          "Reduces acne scars",
          "Stimulates collagen remodeling",
        ],
        concerns: ["loose-skin", "jawline", "acne-scars"],
      },
      {
        title: "HIFU (High-Intensity Focused Ultrasound)",
        text: "A non-invasive lift that targets deep structural layers to create natural tightening and lifting without surgery or downtime.",
        benefits: [
          "Non-surgical lifting",
          "Jawline contouring",
          "Skin tightening",
          "Minimal recovery",
        ],
        concerns: ["loose-skin", "jawline"],
      },
    ],
  },
  {
    id: "pigmentation",
    name: "Pigmentation & Acne Marks",
    icon: "blur_on",
    blurb:
      "Resurfacing care that fades pigmentation, sun damage, and acne marks.",
    treatments: [
      {
        title: "Medical Chemical Peel",
        text: "Professional-grade resurfacing that reduces pigmentation, sun damage, melasma, and acne marks while revealing brighter skin.",
        benefits: [
          "Improves clarity",
          "Reduces pigmentation",
          "Smooths texture",
          "Promotes skin renewal",
        ],
        concerns: ["pigmentation", "acne-scars", "dull-skin"],
      },
    ],
  },
  {
    id: "body",
    name: "Body Contouring",
    icon: "fitness_center",
    blurb:
      "Sculpt, tone, and tighten targeted areas with advanced body technologies.",
    treatments: [
      {
        title: "Non-Surgical Body Contouring",
        text: "Radiofrequency and muscle-stimulation technologies tone, tighten, and reshape the abdomen, arms, thighs, buttocks, and waistline.",
        benefits: [
          "Improved body definition",
          "Skin tightening",
          "Muscle toning",
          "Reduces stubborn fat appearance",
        ],
        concerns: ["loose-skin"],
      },
    ],
  },
  {
    id: "wellness",
    name: "Wellness & IV Therapy",
    icon: "water_drop",
    blurb:
      "Intravenous wellness infusions for energy, immunity, and radiant skin.",
    treatments: [
      {
        title: "Premium IV Drip Therapy",
        text: "Scientifically formulated infusions deliver vitamins, antioxidants, and nutrients directly into the bloodstream for maximum absorption.",
        benefits: [
          "Immune support & energy boost",
          "Skin brightening",
          "Anti-aging therapy",
          "Hydration recovery",
        ],
        concerns: ["dull-skin", "pigmentation", "relaxation"],
      },
    ],
  },
  {
    id: "consultation",
    name: "Doctor Consultation",
    icon: "clinical_notes",
    blurb:
      "A personalized assessment and treatment plan with our licensed aesthetic physician.",
    treatments: [
      {
        title: "Aesthetic Doctor Consultation",
        text: "A one-on-one consultation to assess your concerns, analyze your skin and facial structure, and build a customized treatment plan.",
        benefits: [
          "Facial assessment",
          "Skin analysis",
          "Treatment recommendations",
          "Personalized beauty roadmap",
        ],
        concerns: [
          "dull-skin",
          "fine-lines",
          "acne-scars",
          "pigmentation",
          "loose-skin",
          "volume-loss",
          "jawline",
          "under-eye",
        ],
      },
    ],
  },
];

export const allClinicTreatments: ClinicTreatment[] = clinicGroups.flatMap(
  (g) => g.treatments,
);

export const allHomeServices: HomeService[] = homeCategories.flatMap(
  (c) => c.services,
);

export function clinicTreatmentsForConcern(
  concernId: string,
): ClinicTreatment[] {
  return allClinicTreatments.filter((t) => t.concerns?.includes(concernId));
}

export function homeServicesForConcern(concernId: string): HomeService[] {
  return allHomeServices.filter((s) => s.concerns?.includes(concernId));
}
