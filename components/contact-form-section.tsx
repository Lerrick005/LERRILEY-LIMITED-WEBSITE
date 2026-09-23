"use client";

import { useEffect, useRef, useState } from "react";

import {
  INTENT_ICONS,
  type IntentIconKey,
} from "@/components/visuals/intent-icons";
import { contactIntents, contactPage } from "@/content/contact";
import { track } from "@/lib/analytics/track";
import {
  BUDGET_OPTIONS,
  ContactFormSchema,
  TIMELINE_OPTIONS,
  type ContactFormValues,
} from "@/lib/validation/contact";

import styles from "@/app/contact/page.module.css";

/**
 * Contact form section.
 *
 * Client component: contains the intent selector and the form. The form
 * validates on the client for immediate feedback and again on the server.
 *
 * The form includes a honeypot field and a time-trap. Real users never
 * notice them; bots that fill everything or submit instantly are rejected.
 *
 * Two analytics events fire here:
 *   - form_start: once, on the first focus of any field in the form.
 *   - form_submit: after a successful submission.
 */

type IntentSlug = (typeof contactIntents)[number]["slug"];
type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactFormSection() {
  const [selected, setSelected] = useState<IntentSlug | null>(null);
  const [state, setState] = useState<SubmitState>("idle");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef<number>(Date.now());
  const hasStarted = useRef<boolean>(false);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const handleFormFocus = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    track({
      name: "form_start",
      intent: selected ?? "something-else",
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setFieldErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);

    const intent = selected ?? "something-else";

    const raw = {
      name: String(data.get("name") ?? ""),
      organization: String(data.get("organization") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      projectType: intent,
      problem: String(data.get("problem") ?? ""),
      budget: String(data.get("budget") ?? ""),
      timeline: String(data.get("timeline") ?? ""),
      details: String(data.get("details") ?? ""),
      website: String(data.get("website") ?? ""),
      elapsedMs: Date.now() - mountedAt.current,
    };

    const parsed = ContactFormSchema.safeParse(raw);

    if (!parsed.success) {
      const errors: Partial<Record<keyof ContactFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFormValues;
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      const firstErrorKey = Object.keys(errors)[0];
      const firstField = form.querySelector<HTMLElement>(
        `[name="${firstErrorKey}"]`,
      );
      firstField?.focus();
      return;
    }

    setState("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      track({ name: "form_submit", intent });

      setState("success");
      form.reset();
      setSelected(null);
    } catch {
      setState("error");
      setSubmitError(
        "Something went wrong sending the message. Please try again, or use the phone number below.",
      );
    }
  };

  if (state === "success") {
    return (
      <section className={styles.formSection} aria-labelledby="form-title">
        <h2 id="form-title" className={styles.sectionTitle}>
          Message received
        </h2>
        <p className={styles.successText}>
          Thank you. We have your message. We reply to every enquiry, and we
          will be in touch.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className={styles.intentSection} aria-labelledby="intent-title">
        <h2 id="intent-title" className={styles.sectionTitle}>
          What would you like to discuss?
        </h2>

        <div
          className={styles.intentGrid}
          role="radiogroup"
          aria-labelledby="intent-title"
        >
          {contactIntents.map((intent) => {
            const Icon = INTENT_ICONS[intent.slug as IntentIconKey];
            const isSelected = selected === intent.slug;
            return (
              <button
                key={intent.slug}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() =>
                  setSelected((current) =>
                    current === intent.slug ? null : intent.slug,
                  )
                }
                className={`${styles.intentCard} ${isSelected ? styles.intentCardSelected : ""}`}
              >
                <span className={styles.intentIconWrap}>
                  {Icon ? <Icon /> : null}
                </span>
                <span className={styles.intentLabel}>{intent.label}</span>
                <span className={styles.intentDescription}>
                  {intent.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {selected !== null ? (
        <section className={styles.formSection} aria-labelledby="form-title">
          <h2 id="form-title" className={styles.sectionTitle}>
            {contactPage.formHeading}
          </h2>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            onFocus={handleFormFocus}
            noValidate
            className={styles.form}
          >
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Name <span className={styles.required}>*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={styles.input}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                aria-invalid={fieldErrors.name ? true : undefined}
              />
              {fieldErrors.name ? (
                <p id="name-error" role="alert" className={styles.error}>
                  {fieldErrors.name}
                </p>
              ) : null}
            </div>

            <div className={styles.field}>
              <label htmlFor="organization" className={styles.label}>
                Organization
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                autoComplete="organization"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={styles.input}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                aria-invalid={fieldErrors.email ? true : undefined}
              />
              {fieldErrors.email ? (
                <p id="email-error" role="alert" className={styles.error}>
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Phone or WhatsApp
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={styles.input}
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                aria-invalid={fieldErrors.phone ? true : undefined}
              />
              {fieldErrors.phone ? (
                <p id="phone-error" role="alert" className={styles.error}>
                  {fieldErrors.phone}
                </p>
              ) : null}
            </div>

            <div className={styles.field}>
              <label htmlFor="problem" className={styles.label}>
                What are you trying to solve?{" "}
                <span className={styles.required}>*</span>
              </label>
              <textarea
                id="problem"
                name="problem"
                rows={6}
                required
                className={styles.textarea}
                aria-describedby={
                  fieldErrors.problem ? "problem-error" : undefined
                }
                aria-invalid={fieldErrors.problem ? true : undefined}
              />
              {fieldErrors.problem ? (
                <p id="problem-error" role="alert" className={styles.error}>
                  {fieldErrors.problem}
                </p>
              ) : null}
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="budget" className={styles.label}>
                  Budget range
                </label>
                <select
                  id="budget"
                  name="budget"
                  className={styles.select}
                  defaultValue=""
                >
                  {BUDGET_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="timeline" className={styles.label}>
                  Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  className={styles.select}
                  defaultValue=""
                >
                  {TIMELINE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="details" className={styles.label}>
                Anything else
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                className={styles.textarea}
              />
            </div>

            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {submitError ? (
              <p role="alert" className={styles.submitError}>
                {submitError}
              </p>
            ) : null}

            <div className={styles.formActions}>
              <button
                type="submit"
                disabled={state === "submitting"}
                className={styles.submitButton}
              >
                {state === "submitting" ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>
        </section>
      ) : (
        <section className={styles.formSection} aria-labelledby="form-title">
          <h2 id="form-title" className={styles.sectionTitle}>
            {contactPage.formHeading}
          </h2>
          <p className={styles.formPrompt}>
            Choose an option above and the form will appear here.
          </p>
        </section>
      )}
    </>
  );
}
