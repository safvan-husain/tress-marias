import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import ConcernExplorer from "../../components/ConcernExplorer";

export const metadata: Metadata = {
  title: "Help Me Find — Tres Marias Beauty & Wellness",
  description:
    "Tell us your concern and we'll guide you to the right home service or clinic treatment at Tres Marias.",
};

export default function FindPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Help me find"
        title="Not sure where"
        titleAccent="to start?"
        description="Tell us what you'd like to improve and we'll point you to the services that help — across both home and clinic."
        crossLinks={[
          {
            label: "Book a home service",
            href: "/home-services",
            icon: "home_health",
          },
          {
            label: "Explore clinic treatments",
            href: "/clinic-services",
            icon: "local_hospital",
          },
        ]}
      />

      <section className="relative overflow-hidden bg-canvas-deep pb-[110px] pt-8">
        <div
          className="pointer-events-none absolute inset-0 content-section-bg"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
          <ConcernExplorer />
        </div>
      </section>
    </main>
  );
}
