import Icon from "@/app/components/Icon";

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-[1.75rem] font-bold text-ink">
        Dashboard
      </h1>
      <p className="mt-2 text-[0.92rem] text-muted">
        Welcome to the Tres Marias admin panel. Service booking, appointments,
        and more will be managed from here in upcoming phases.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-surface/30 p-5">
          <Icon
            name="medical_services"
            className="text-[1.5rem] text-primary-hover"
          />
          <h2 className="mt-3 font-display text-[1.05rem] font-bold text-ink">
            Doctors
          </h2>
          <p className="mt-1 text-[0.85rem] text-muted">
            View staff and create new doctor accounts.
          </p>
        </div>
        <div className="rounded-2xl border border-dashed border-hairline bg-surface/10 p-5 opacity-70">
          <Icon name="event" className="text-[1.5rem] text-muted" />
          <h2 className="mt-3 font-display text-[1.05rem] font-bold text-ink">
            Appointments
          </h2>
          <p className="mt-1 text-[0.85rem] text-muted">Coming soon.</p>
        </div>
      </div>
    </div>
  );
}
