import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Refund Policy — Sprout" };

export default function RefundsPage() {
  return (
    <LegalPage title="Refund policy" updated="28 April 2026">
      <p>
        Sprout sells digital downloads. By their nature these can&apos;t be returned, so refunds are limited. This page explains when we will and won&apos;t refund a purchase, and how to ask.
      </p>

      <h2>When we&apos;ll refund</h2>
      <ul>
        <li><strong>The file is broken or missing.</strong> If a download fails, the file is corrupt, or the resource isn&apos;t what the listing described, we&apos;ll refund in full.</li>
        <li><strong>You bought by mistake</strong> and you haven&apos;t downloaded the file yet. Email us within 14 days and we&apos;ll refund.</li>
        <li><strong>Duplicate charges</strong> caused by a payment-system glitch.</li>
      </ul>

      <h2>When we usually won&apos;t refund</h2>
      <ul>
        <li>You&apos;ve already downloaded the resource and changed your mind.</li>
        <li>You bought the wrong year group or subject and didn&apos;t check the listing.</li>
        <li>The resource works correctly but you don&apos;t personally like it.</li>
      </ul>

      <h2>Your rights under the Australian Consumer Law</h2>
      <p>
        Nothing in this policy affects your rights under the Australian Consumer Law (ACL). You&apos;re entitled to a refund, replacement, or remedy if a resource:
      </p>
      <ul>
        <li>Has a major fault (e.g. is unusable, doesn&apos;t do what was advertised, or doesn&apos;t match the description).</li>
        <li>Is unsafe.</li>
        <li>Doesn&apos;t match a sample shown on the listing.</li>
      </ul>
      <p>
        You&apos;re also entitled to compensation for any reasonably foreseeable loss or damage caused by a major fault. These rights apply regardless of what this policy says.
      </p>

      <h2>How to ask for a refund</h2>
      <p>Email <a href="mailto:brett@thebault.co.uk">brett@thebault.co.uk</a> with:</p>
      <ul>
        <li>The email address on your Sprout account.</li>
        <li>The receipt or order ID from your Stripe email.</li>
        <li>A short note on what went wrong.</li>
      </ul>
      <p>We aim to reply within 3 business days. Approved refunds go back to the original payment method within 5–10 business days, depending on your bank.</p>

      <h2>Chargebacks</h2>
      <p>Please contact us before raising a chargeback with your bank — most issues are quicker to fix directly.</p>
    </LegalPage>
  );
}
