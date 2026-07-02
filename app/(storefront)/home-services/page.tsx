import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import HomeServicesMenu from "../../components/HomeServicesMenu";

export const metadata: Metadata = {
  title: "Home Services — Tres Marias Beauty & Wellness",
  description:
    "Salon-quality nail, hair, massage, makeup, lash, and brow services brought to your home by Tres Marias.",
};

export default function HomeServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="At-home services"
        title="Beauty at"
        titleAccent="your home."
        description="Professional beauty and wellness, brought to your door. Browse the full menu of nail, hair, massage, makeup, lash, and brow services and book the ones you love over WhatsApp."
        crossLinks={[
          {
            label: "Explore clinic treatments",
            href: "/clinic-services",
            icon: "local_hospital",
          },
          { label: "Help me find", href: "/find", icon: "quiz" },
        ]}
      />

      <section className="relative overflow-hidden bg-canvas-deep pb-[110px] pt-4">
        <div
          className="pointer-events-none absolute inset-0 content-section-bg"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
          <HomeServicesMenu />
        </div>
      </section>
    </main>
  );
}
