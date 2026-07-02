import Link from "next/link";
import Icon from "@/app/components/Icon";
import AuthForm from "@/app/components/auth/AuthForm";
import { customerLogin } from "@/app/actions/auth";

export default function LoginPage() {
  return (
    <main className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-canvas-deep pt-28 pb-20">
      <div
        className="pointer-events-none absolute inset-0 content-section-bg"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-md px-6">
        <div className="glass-strong rounded-[28px] p-8 sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-wide text-primary-hover">
            <Icon name="account_circle" className="text-[0.95rem]" />
            Customer account
          </span>
          <h1 className="mt-4 font-display text-[2rem] font-bold leading-tight text-ink">
            Welcome back
          </h1>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
            Sign in with your username and password.
          </p>

          <div className="mt-8">
            <AuthForm
              action={customerLogin}
              submitLabel="Sign in"
              pendingLabel="Signing in…"
              footer={
                <p className="text-center text-[0.85rem] text-muted">
                  No account yet?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-primary-hover hover:text-primary"
                  >
                    Sign up
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
