"use client";

import { FormEvent, useState } from "react";
import Icon from "./Icon";
import { bookingMessage, whatsappUrl } from "../lib/whatsapp";

export default function BookingForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = email.trim()
      ? `${bookingMessage()}\n\nMy email: ${email.trim()}`
      : bookingMessage();
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <label className="glass flex flex-1 items-center gap-2 rounded-full px-5 py-1">
        <Icon name="mail" className="text-[1.2rem] text-muted" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          className="w-full bg-transparent py-3 text-[0.95rem] text-ink placeholder:text-muted/70 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="state-layer ripple inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-7 text-[0.95rem] font-medium text-ink transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(46,139,122,0.6)]"
      >
        <span className="relative z-10">Request a booking</span>
        <Icon name="arrow_forward" className="relative z-10 text-[1.15rem]" />
      </button>
    </form>
  );
}
