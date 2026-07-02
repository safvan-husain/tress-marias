"use client";

import { useActionState } from "react";
import Icon from "../Icon";

type Props = {
  action: (
    state: AuthFormState,
    formData: FormData,
  ) => Promise<AuthFormState>;
  submitLabel: string;
  pendingLabel: string;
  footer?: React.ReactNode;
};

export type AuthFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export default function AuthForm({
  action,
  submitLabel,
  pendingLabel,
  footer,
}: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="username"
          className="mb-1.5 block text-[0.82rem] font-medium text-muted"
        >
          Username
        </label>
        <label className="glass flex items-center gap-2 rounded-xl px-4 py-1">
          <Icon name="person" className="text-[1.1rem] text-muted" />
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="e.g. jane-doe"
            className="w-full bg-transparent py-3 text-[0.95rem] text-ink placeholder:text-muted/70 focus:outline-none"
          />
        </label>
        {state?.errors?.username?.map((error) => (
          <p key={error} className="mt-1.5 text-[0.8rem] text-red-400">
            {error}
          </p>
        ))}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-[0.82rem] font-medium text-muted"
        >
          Password
        </label>
        <label className="glass flex items-center gap-2 rounded-xl px-4 py-1">
          <Icon name="lock" className="text-[1.1rem] text-muted" />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            className="w-full bg-transparent py-3 text-[0.95rem] text-ink placeholder:text-muted/70 focus:outline-none"
          />
        </label>
        {state?.errors?.password?.map((error) => (
          <p key={error} className="mt-1.5 text-[0.8rem] text-red-400">
            {error}
          </p>
        ))}
      </div>

      {state?.message && (
        <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-[0.85rem] text-red-300">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="state-layer ripple mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-7 text-[0.95rem] font-medium text-on-primary transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(46,139,122,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-on-primary/40 border-t-on-primary" />
            <span className="relative z-10">{pendingLabel}</span>
          </>
        ) : (
          <span className="relative z-10">{submitLabel}</span>
        )}
      </button>

      {footer}
    </form>
  );
}
