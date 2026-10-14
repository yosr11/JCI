import * as React from "react";
import { useState } from "react";
import { siteData } from "../data/siteData.js";
import PageTitle from "../components/PageTitle.jsx";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSending(true);
    setSent(false);
    setError("");

    try {
      const response = await fetch(
        import.meta.env.VITE_CONTACT_API_URL || "/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
            website: formData.get("website"),
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message.");
      }

      form.reset();
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send your message. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageTitle
        title="Contact"
        subtitle="Have a question, an idea, or want to join us? Get in touch."
      />
      <section className="sec">
        <div className="contact-layout">
          <div className="contact-details">
            <article className="contact-card">
              <span className="contact-card-icon" aria-hidden="true">✉</span>
              <div>
                <h2>Email</h2>
                <a href={`mailto:${siteData.email}`}>{siteData.email}</a>
              </div>
            </article>
            <article className="contact-card">
              <span className="contact-card-icon" aria-hidden="true">⌖</span>
              <div>
                <h2>Notre localisation</h2>
                <p>Dar Chaabane El Fehri, Nabeul, Tunisie</p>
              </div>
            </article>
          </div>
          <div className="contact-map">
            <iframe
              title="Carte de Dar Chaabane El Fehri, Tunisie"
              src="https://www.google.com/maps?q=Dar%20Chaabane%20El%20Fehri%2C%20Nabeul%2C%20Tunisia&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Dar%20Chaabane%20El%20Fehri%2C%20Nabeul%2C%20Tunisia"
              target="_blank"
              rel="noreferrer"
            >
              Ouvrir la carte
            </a>
          </div>
        </div>
        <form className="form contact-form" onSubmit={handleSubmit}>
          <h2>Envoyez-nous un message</h2>
            <label>
              Name
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>
            <label>
              Message
              <textarea name="message" rows="4" required />
            </label>
            <label className="contact-form-trap" aria-hidden="true">
              Leave this field empty
              <input name="website" tabIndex="-1" autoComplete="off" />
            </label>
            <button className="btn" type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send message"}
            </button>
          {sent && (
            <p className="ok" role="status">
              Your message has been sent. Thank you for contacting us.
            </p>
          )}
          {error && (
            <p className="contact-error" role="alert">
              {error}
            </p>
          )}
        </form>
      </section>
    </>
  );
}
