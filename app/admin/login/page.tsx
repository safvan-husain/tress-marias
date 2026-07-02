import Icon from "@/app/components/Icon";
import AuthForm from "@/app/components/auth/AuthForm";
import { staffLogin } from "@/app/actions/auth";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-canvas-deep p-6">
      <div className="w-full max-w-md rounded-[28px] border border-hairline bg-surface/40 p-8 sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-wide text-primary-hover">
          <Icon name="admin_panel_settings" className="text-[0.95rem]" />
          Staff access
        </span>
        <h1 className="mt-4 font-display text-[2rem] font-bold leading-tight text-ink">
          Admin sign in
        </h1>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
          For admin and doctor accounts only.
        </p>

        <div className="mt-8">
          <AuthForm
            action={staffLogin}
            submitLabel="Sign in"
            pendingLabel="Signing in…"
          />
        </div>
      </div>
    </main>
  );
}
