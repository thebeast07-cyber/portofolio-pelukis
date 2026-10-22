"use client";

// Form inquiry ringan: karya (terisi otomatis, tidak bisa diubah), nama, email, negara, pesan opsional.
// Dipakai untuk inquiry karya, "Request something similar", pertanyaan umum, dan commission.

import { useState, type FormEvent } from "react";
import { t } from "@/lib/i18n";
import { validateInquiry, type InquiryErrors, type InquiryField, type InquiryType } from "@/lib/inquiry";
import type { Locale } from "@/lib/types";

type Props = {
  locale: Locale;
  type: InquiryType;
  artwork?: { slug: string; title: string };
};

type Status = "idle" | "sending" | "success" | "error";

export default function InquiryForm({ locale, type, artwork }: Props) {
  const dict = t(locale);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const idPrefix = `${type}-${artwork?.slug ?? "general"}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      type,
      artworkSlug: artwork?.slug,
      name: form.get("name"),
      email: form.get("email"),
      country: form.get("country"),
      message: form.get("message"),
      website: form.get("website"),
    };

    const check = validateInquiry(payload);
    if (!check.ok) {
      setErrors(check.errors);
      const first = Object.keys(check.errors)[0];
      document.getElementById(`${idPrefix}-${first}`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const data = await res.json().catch(() => null);
      if (data?.errors) setErrors(data.errors);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="mt-6 bg-surface px-5 py-6">
        <p className="font-display text-lg">{dict.form.successTitle}</p>
        <p className="mt-2 text-sm">{dict.form.successBody}</p>
      </div>
    );
  }

  const field = (name: InquiryField, label: string, input: JSX.Element, hint?: string) => {
    const id = `${idPrefix}-${name}`;
    const error = errors[name];
    return (
      <div>
        <label htmlFor={id} className="text-sm">
          {label}
          {name === "message" ? <span className="text-muted"> ({dict.form.optional})</span> : null}
        </label>
        {input}
        {hint ? (
          <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={`${id}-error`} className="mt-1 text-xs text-accent">
            {dict.form.errors[error]}
          </p>
        ) : null}
      </div>
    );
  };

  const describedBy = (name: InquiryField, hint?: boolean) =>
    [hint ? `${idPrefix}-${name}-hint` : "", errors[name] ? `${idPrefix}-${name}-error` : ""].filter(Boolean).join(" ") ||
    undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
      {artwork ? (
        <div>
          <p className="text-sm">{dict.form.artwork}</p>
          <p className="field mt-1 text-muted" aria-readonly="true">
            {artwork.title}
          </p>
        </div>
      ) : null}

      {field(
        "name",
        dict.form.name,
        <input
          id={`${idPrefix}-name`}
          name="name"
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={describedBy("name")}
          className="field mt-1"
        />,
      )}
      {field(
        "email",
        dict.form.email,
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-invalid={!!errors.email}
          aria-describedby={describedBy("email")}
          className="field mt-1"
        />,
      )}
      {field(
        "country",
        dict.form.country,
        <input
          id={`${idPrefix}-country`}
          name="country"
          autoComplete="country-name"
          required
          aria-invalid={!!errors.country}
          aria-describedby={describedBy("country", true)}
          className="field mt-1"
        />,
        dict.form.countryHint,
      )}
      {field(
        "message",
        dict.form.message,
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={4}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          className="field mt-1"
        />,
      )}

      {/* Honeypot: disembunyikan dari manusia dan pembaca layar. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-accent">
          {dict.form.error}
        </p>
      ) : null}

      <button type="submit" disabled={status === "sending"} className="btn-solid w-full disabled:opacity-60 sm:w-auto">
        {status === "sending" ? dict.form.sending : type === "commission" ? dict.form.submitCommission : dict.form.submit}
      </button>
    </form>
  );
}
