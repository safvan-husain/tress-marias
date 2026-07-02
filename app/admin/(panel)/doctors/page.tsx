import { verifyStaffSession } from "@/app/lib/auth/dal";
import { listUsersByRole } from "@/app/lib/db/users";
import CreateDoctorForm from "@/app/components/admin/CreateDoctorForm";
import { createDoctor } from "@/app/actions/auth";
import Icon from "@/app/components/Icon";

export default async function AdminDoctorsPage() {
  const session = await verifyStaffSession();
  const doctors = await listUsersByRole("doctor");
  const isAdmin = session.role === "admin";

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-[1.75rem] font-bold text-ink">
        Doctors
      </h1>
      <p className="mt-2 text-[0.92rem] text-muted">
        Licensed aesthetic team accounts with access to the admin panel.
      </p>

      {isAdmin && (
        <div className="mt-8">
          <CreateDoctorForm action={createDoctor} />
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-[0.82rem] font-medium uppercase tracking-wide text-muted">
          All doctors ({doctors.length})
        </h2>

        {doctors.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-hairline px-6 py-10 text-center">
            <Icon name="group" className="mx-auto text-[2rem] text-muted" />
            <p className="mt-3 text-[0.9rem] text-muted">
              No doctors yet.
              {isAdmin ? " Create one using the form above." : ""}
            </p>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface/20">
            {doctors.map((doctor) => (
              <li
                key={doctor.userId}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary/15">
                    <Icon
                      name="medical_services"
                      className="text-[1.1rem] text-primary-hover"
                    />
                  </span>
                  <div>
                    <p className="font-medium text-ink">{doctor.username}</p>
                    <p className="text-[0.78rem] text-muted">
                      Added{" "}
                      {new Date(doctor.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-hairline px-2.5 py-0.5 text-[0.72rem] font-medium capitalize text-muted">
                  {doctor.role}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
