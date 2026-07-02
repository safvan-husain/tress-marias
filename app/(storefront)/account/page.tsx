import { getOptionalSession } from "@/app/lib/auth/dal";
import { customerLogout } from "@/app/actions/auth";
import Icon from "@/app/components/Icon";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getOptionalSession();
  if (!session?.userId || session.role !== "customer") {
    redirect("/login");
  }

  return (
    <main className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-canvas-deep pt-28 pb-20">
      <div
        className="pointer-events-none absolute inset-0 content-section-bg"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-lg px-6">
        <div className="glass-strong rounded-[28px] p-8 sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-wide text-primary-hover">
            <Icon name="account_circle" className="text-[0.95rem]" />
            Your account
          </span>
          <h1 className="mt-4 font-display text-[2rem] font-bold leading-tight text-ink">
            Hello, {session.username}
          </h1>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
            You&apos;re signed in as a customer. Appointment history and
            bookings will appear here in a future update.
          </p>

          <div className="mt-8 rounded-2xl border border-hairline bg-surface/40 p-5">
            <dl className="space-y-3 text-[0.9rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Username</dt>
                <dd className="font-medium text-ink">{session.username}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Role</dt>
                <dd className="font-medium capitalize text-ink">
                  {session.role}
                </dd>
              </div>
            </dl>
          </div>

          <form action={customerLogout} className="mt-8">
            <button
              type="submit"
              className="state-layer inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-ink/20 px-6 text-[0.9rem] font-medium text-ink transition-colors hover:border-ink/40"
            >
              <Icon name="logout" className="relative z-10 text-[1.1rem]" />
              <span className="relative z-10">Sign out</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
