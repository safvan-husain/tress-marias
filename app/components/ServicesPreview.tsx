"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import HomeServiceCard from "./HomeServiceCard";
import ClinicTreatmentCard from "./ClinicTreatmentCard";
import ClinicBookingModal from "./ClinicBookingModal";
import CategoryChipStrip from "./CategoryChipStrip";
import {
  clinicGroupChips,
  clinicGroups,
  homeCategories,
  homeCategoryChips,
  type ClinicTreatment,
} from "../data/services";

const PREVIEW_COUNT = 3;

export default function ServicesPreview() {
  const [homeCategoryIndex, setHomeCategoryIndex] = useState(0);
  const [clinicGroupIndex, setClinicGroupIndex] = useState(0);
  const [bookingTreatment, setBookingTreatment] =
    useState<ClinicTreatment | null>(null);

  const activeHomeCategory = homeCategories[homeCategoryIndex];
  const activeClinicGroup = clinicGroups[clinicGroupIndex];

  return (
    <>
      {/* At Home */}
      <div className="mt-20">
        <PreviewHeader
          icon="home_health"
          eyebrow="At home"
          title="A few of our home services"
          description="Salon-quality care brought to your door."
          viewMoreHref="/home-services"
          viewMoreLabel="View all home services"
        />

        <div className="mt-8 flex justify-center">
          <CategoryChipStrip
            items={homeCategoryChips}
            activeIndex={homeCategoryIndex}
            onActiveIndexChange={setHomeCategoryIndex}
          />
        </div>

        <div
          key={activeHomeCategory.id}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {activeHomeCategory.services.slice(0, PREVIEW_COUNT).map((service, i) => (
            <HomeServiceCard
              key={service.title}
              service={service}
              icon={activeHomeCategory.icon}
              delay={i * 60}
            />
          ))}
        </div>
      </div>

      {/* In Clinic */}
      <div className="mt-24">
        <PreviewHeader
          icon="local_hospital"
          eyebrow="In clinic"
          title="A few of our clinic treatments"
          description="Advanced, medical-grade aesthetics."
          viewMoreHref="/clinic-services"
          viewMoreLabel="View all clinic treatments"
        />

        <div className="mt-8 flex justify-center">
          <CategoryChipStrip
            items={clinicGroupChips}
            activeIndex={clinicGroupIndex}
            onActiveIndexChange={setClinicGroupIndex}
          />
        </div>

        <div
          key={activeClinicGroup.id}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {activeClinicGroup.treatments.slice(0, PREVIEW_COUNT).map((treatment, i) => (
            <ClinicTreatmentCard
              key={treatment.title}
              treatment={treatment}
              icon={activeClinicGroup.icon}
              groupName={activeClinicGroup.name}
              delay={i * 60}
              onBook={() => setBookingTreatment(treatment)}
            />
          ))}
        </div>
      </div>

      {bookingTreatment && (
        <ClinicBookingModal
          key={bookingTreatment.title}
          treatment={bookingTreatment}
          onClose={() => setBookingTreatment(null)}
        />
      )}
    </>
  );
}

function PreviewHeader({
  icon,
  eyebrow,
  title,
  description,
  viewMoreHref,
  viewMoreLabel,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  description: string;
  viewMoreHref: string;
  viewMoreLabel: string;
}) {
  return (
    <div className="reveal flex flex-col gap-5 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/90">
          <Icon name={icon} className="text-[1.4rem] text-on-primary" />
        </span>
        <div>
          <p className="eyebrow mb-2">{eyebrow}</p>
          <h3 className="font-display text-[1.7rem] font-bold leading-tight text-ink sm:text-[2rem]">
            {title}
          </h3>
          <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">
            {description}
          </p>
        </div>
      </div>

      <Link
        href={viewMoreHref}
        className="state-layer ripple inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-full border border-primary-hover/40 bg-primary/15 px-5 text-[0.88rem] font-medium text-primary-hover transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:border-primary-hover hover:bg-primary hover:text-on-primary sm:self-auto"
      >
        <span className="relative z-10">{viewMoreLabel}</span>
        <Icon
          name="arrow_forward"
          className="relative z-10 text-[1.1rem]"
        />
      </Link>
    </div>
  );
}
