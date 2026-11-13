"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/content";
import { ArrowRight, ArrowUpRight, Check } from "@/components/ui/Icons";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  date: string;
  guests: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  interest: "",
  date: "",
  guests: "",
  message: "",
};

const interests = [
  "A stay",
  "A wedding or celebration",
  "A corporate event",
  "Dining",
  "Something else",
];

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const update =
    (field: keyof FormValues) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };

  const summary = () => {
    const lines = [
      "Hello Hotel Kanaar Corbett,",
      "",
      `My name is ${values.name.trim() || "—"}.`,
      `I would like to enquire about: ${values.interest || "a stay"}.`,
      values.date ? `Preferred date: ${values.date}.` : "",
      values.guests ? `Number of guests: ${values.guests}.` : "",
      values.message.trim() ? `A little more: ${values.message.trim()}` : "",
      "",
      `You can reach me on ${values.phone.trim() || "—"}${
        values.email.trim() ? ` or ${values.email.trim()}` : ""
      }.`,
      "",
      "Thank you.",
    ];
    return lines.filter(Boolean).join("\n");
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: FormErrors = {};

    if (values.name.trim().length < 2) next.name = "Please share your name.";
    const digits = values.phone.replace(/\D/g, "");
    if (digits.length < 8) next.phone = "Please share a contactable phone number.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please check the email address.";
    }
    if (!values.interest) next.interest = "Please choose an enquiry type.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setSent(true);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setSent(false);
  };

  const message = summary();
  const whatsapp = `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
  const mailto = `${CONTACT.emailHref}?subject=${encodeURIComponent(
    "Enquiry — Hotel Kanaar Corbett",
  )}&body=${encodeURIComponent(message)}`;

  return (
    <section className="section contact" id="contact">
      <div className="shell">
        <div className="contact__grid">
          <div className="contact__copy">
            <div className="section-label">
              <span>08</span>
              <span>Enquire</span>
            </div>
            <h2 className="h2" data-reveal-lines>
              <span className="line-mask">
                <span>Your stay</span>
              </span>
              <span className="line-mask">
                <span>
                  starts <em>here.</em>
                </span>
              </span>
            </h2>
            <p className="contact__intro" data-reveal>
              Tell us a little about what you have in mind — a room, a table, a
              wedding, or a room full of colleagues. Our team will take it from
              there.
            </p>

            <div className="contact__details" data-reveal data-reveal-delay="0.08">
              <div className="contact__detail">
                <h4>Reservations</h4>
                <p>
                  <a href={CONTACT.phonePrimaryHref}>{CONTACT.phonePrimary}</a>
                  <br />
                  <a href={CONTACT.phoneSecondaryHref}>{CONTACT.phoneSecondary}</a>
                  <br />
                  <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </p>
              </div>
              <div className="contact__detail">
                <h4>Email</h4>
                <p>
                  <a href={CONTACT.emailHref}>{CONTACT.email}</a>
                </p>
              </div>
              <div className="contact__detail contact__detail--wide">
                <h4>Find us</h4>
                <p>{CONTACT.address}</p>
                <a
                  className="link-arrow contact__map-link"
                  href={CONTACT.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions
                  <ArrowUpRight />
                </a>
              </div>
            </div>

            <div className="contact__assist">
              <span>Prefer to speak?</span>
              <a href={CONTACT.phonePrimaryHref}>Call our team</a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="form-card" data-reveal data-reveal-delay="0.12">
            <div className="form-card__head">
              <h3>Make an enquiry</h3>
              <span>We reply with care</span>
            </div>

            {sent ? (
              <div className="form-success" role="status" aria-live="polite">
                <span className="form-success__icon" aria-hidden="true">
                  <Check />
                </span>
                <h3>Your enquiry is ready{values.name ? `, ${values.name.split(" ")[0]}` : ""}.</h3>
                <p>
                  Send it directly to our reservations team on WhatsApp or by
                  email. We will come back to you within a few working hours.
                </p>
                <div className="form-success__actions">
                  <a
                    className="btn btn--primary"
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Continue on WhatsApp
                    <ArrowUpRight />
                  </a>
                  <a className="btn btn--ghost" href={mailto}>
                    Send by email
                    <ArrowRight />
                  </a>
                </div>
                <button type="button" className="form-success__reset" onClick={reset}>
                  Make another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="form-row">
                  <div className={`field${errors.name ? " field--error" : ""}`}>
                    <label htmlFor="name">
                      Name <span className="req">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={update("name")}
                      placeholder="Your full name"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name ? (
                      <span className="field__error" id="name-error">
                        {errors.name}
                      </span>
                    ) : null}
                  </div>

                  <div className={`field${errors.phone ? " field--error" : ""}`}>
                    <label htmlFor="phone">
                      Phone <span className="req">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={values.phone}
                      onChange={update("phone")}
                      placeholder="+91"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone ? (
                      <span className="field__error" id="phone-error">
                        {errors.phone}
                      </span>
                    ) : null}
                  </div>

                  <div className={`field${errors.email ? " field--error" : ""}`}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={update("email")}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email ? (
                      <span className="field__error" id="email-error">
                        {errors.email}
                      </span>
                    ) : null}
                  </div>

                  <div className={`field${errors.interest ? " field--error" : ""}`}>
                    <label htmlFor="interest">
                      Interested in <span className="req">*</span>
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={values.interest}
                      onChange={update("interest")}
                      aria-invalid={Boolean(errors.interest)}
                      aria-describedby={errors.interest ? "interest-error" : undefined}
                    >
                      <option value="">Select an option</option>
                      {interests.map((interest) => (
                        <option key={interest} value={interest}>
                          {interest}
                        </option>
                      ))}
                    </select>
                    {errors.interest ? (
                      <span className="field__error" id="interest-error">
                        {errors.interest}
                      </span>
                    ) : null}
                  </div>

                  <div className="field">
                    <label htmlFor="date">Preferred date</label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={values.date}
                      onChange={update("date")}
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="guests">Guests</label>
                    <select
                      id="guests"
                      name="guests"
                      value={values.guests}
                      onChange={update("guests")}
                    >
                      <option value="">Select</option>
                      {["1", "2", "3", "4", "5", "6", "7+", "50+", "100+"].map((count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field field--full">
                    <label htmlFor="message">A little more</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={values.message}
                      onChange={update("message")}
                      placeholder="Tell us about the occasion, the rooms you have in mind, or anything we should know."
                    />
                  </div>
                </div>

                <div className="form-card__submit">
                  <button type="submit" className="btn btn--primary">
                    Prepare my enquiry
                    <ArrowRight />
                  </button>
                  <p className="form-card__note">
                    We will never share your details. Enquiries are answered by our
                    own team.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}