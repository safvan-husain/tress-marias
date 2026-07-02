import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import ClinicServicesMenu from "../../components/ClinicServicesMenu";

export const metadata: Metadata = {
  title: "Clinic Services — Tres Marias Aesthetic & Beauty Polyclinic",
  description:
    "Advanced skin, anti-aging, injectable, rejuvenation, and body treatments at the Tres Marias aesthetic clinic.",
};

export default function ClinicServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="In-clinic treatments"
        title="Advanced aesthetics"
        titleAccent="in clinic."
        description="Medical-grade skin, anti-aging, contouring, tightening, and body treatments performed by our licensed aesthetic team. Browse the full menu and check appointment availability in seconds."
        crossLinks={[
          {
            label: "Book a home service",
            href: "/home-services",
            icon: "home_health",
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
          <ClinicServicesMenu />
        </div>
      </section>
    </main>
  );
}
