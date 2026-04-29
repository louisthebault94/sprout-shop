import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Contact — Sprout" };

export default function ContactPage() {
  return (
    <LegalPage title="Get in touch" updated="28 April 2026">
      <p>
        The fastest way to reach us is by email. We aim to reply within 3 business days.
      </p>

      <h2>General questions, support, and feedback</h2>
      <p>
        <a href="mailto:louis@thebault.com.au">louis@thebault.com.au</a>
      </p>

      <h2>Refund requests</h2>
      <p>
        See the <a href="/refunds">refund policy</a> for what to include, then email <a href="mailto:louis@thebault.com.au">louis@thebault.com.au</a>.
      </p>

      <h2>Privacy and data requests</h2>
      <p>
        For access, correction, deletion, or any other data-protection request, email <a href="mailto:louis@thebault.com.au">louis@thebault.com.au</a>. See the <a href="/privacy">privacy policy</a> for full details.
      </p>

      <h2>Press and partnerships</h2>
      <p>
        Same address — <a href="mailto:louis@thebault.com.au">louis@thebault.com.au</a>. Drop us a line and we&apos;ll get back to you.
      </p>
    </LegalPage>
  );
}
