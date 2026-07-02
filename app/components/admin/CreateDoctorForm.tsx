"use client";

import { useActionState } from "react";
import Icon from "../Icon";
import type { AuthFormState } from "@/app/components/auth/AuthForm";

type Props = {
  action: (
    state: AuthFormState,
    formData: FormData,
  ) => Promise<AuthFormState>;
};

export default function CreateDoctorForm({ action }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-hairline bg-surface/30 p-6"
    >
      <h2 className="font-display text-[1.15rem] font-bold text-ink">
        Create doctor
      </h2>
      <p className="mt-1 text-[0.85rem] text-muted">
        Add a new doctor account with username and password.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="doctor-username"
            className="mb-1.5 block text-[0.8rem] font-medium text-muted"
          >
            Username
          </label>
          <input
            id="doctor-username"
            name="username"
            type="text"
            autoComplete="off"
            placeholder="e.g. dr-sara"
            className="w-full rounded-xl border border-hairline bg-canvas-deep px-4 py-2.5 text-[0.9rem] text-ink placeholder:text-muted/60 focus:border-primary-hover/50 focus:outline-none"
          />
          {state?.errors?.username?.map((error) => (
            <p key={error} className="mt-1 text-[0.78rem] text-red-400">
              {error}
            </p>
          ))}
        </div>

        <div>
          <label
            htmlFor="doctor-password"
            className="mb-1.5 block text-[0.8rem] font-medium text-muted"
          >
            Password
          </label>
          <input
            id="doctor-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="w-full rounded-xl border border-hairline bg-canvas-deep px-4 py-2.5 text-[0.9rem] text-ink placeholder:text-muted/60 focus:border-primary-hover/50 focus:outline-none"
          />
          {state?.errors?.password?.map((error) => (
            <p key={error} className="mt-1 text-[0.78rem] text-red-400">
              {error}
            </p>
          ))}
        </div>
      </div>

      {state?.message && (
        <p className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-[0.85rem] text-red-300">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="state-layer mt-5 inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full bg-primary px-6 text-[0.88rem] font-medium text-on-primary transition-all hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-on-primary/40 border-t-on-primary" />
            <span className="relative z-10">Creating…</span>
          </>
        ) : (
          <>
            <Icon name="person_add" className="relative z-10 text-[1.05rem]" />
            <span className="relative z-10">Create doctor</span>
          </>
        )}
      </button>
    </form>
  );
}
