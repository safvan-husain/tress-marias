import Link from "next/link";
import Icon from "@/app/components/Icon";
import AuthForm from "@/app/components/auth/AuthForm";
import { customerSignup } from "@/app/actions/auth";

export default function SignupPage() {
  return (
    <main className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-canvas-deep pt-28 pb-20">
      <div
        className="pointer-events-none absolute inset-0 content-section-bg"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-md px-6">
        <div className="glass-strong rounded-[28px] p-8 sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-wide text-primary-hover">
            <Icon name="person_add" className="text-[0.95rem]" />
            Create account
          </span>
          <h1 className="mt-4 font-display text-[2rem] font-bold leading-tight text-ink">
            Join Tres Marias
          </h1>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
            Pick a username (lowercase letters and hyphens) and a password.
          </p>

          <div className="mt-8">
            <AuthForm
              action={customerSignup}
              submitLabel="Create account"
              pendingLabel="Creating account…"
              footer={
                <p className="text-center text-[0.85rem] text-muted">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-hover hover:text-primary"
                  >
                    Sign in
                  </Link>
                </p>
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}
