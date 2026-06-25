"use client";

import { useState } from "react";
import Icon from "./Icon";
import ClinicTreatmentCard from "./ClinicTreatmentCard";
import ClinicBookingModal from "./ClinicBookingModal";
import { clinicGroups, type ClinicTreatment } from "../data/services";

export default function ClinicServicesMenu() {
  const [bookingTreatment, setBookingTreatment] =
    useState<ClinicTreatment | null>(null);

  return (
    <>
      <div className="space-y-20">
        {clinicGroups.map((group) => (
          <div key={group.id} id={group.id} className="scroll-mt-28">
            <div
              className="reveal flex flex-col gap-3 border-b border-hairline pb-6 sm:flex-row sm:items-center sm:gap-5"
              data-reveal-delay="40"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-green">
                <Icon
                  name={group.icon}
                  className="text-[1.4rem] text-on-primary"
                />
              </span>
              <div>
                <h3 className="font-display text-[1.7rem] font-bold leading-tight text-ink">
                  {group.name}
                </h3>
                <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">
                  {group.blurb}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.treatments.map((t, ti) => (
                <ClinicTreatmentCard
                  key={t.title}
                  treatment={t}
                  icon={group.icon}
                  groupName={group.name}
                  delay={ti * 60}
                  onBook={() => setBookingTreatment(t)}
                />
              ))}
            </div>
          </div>
        ))}
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
