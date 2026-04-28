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
        <li>You bought the wrong year group / curriculum and didn&apos;t check the listing.</li>
        <li>The resource works correctly but you don&apos;t personally like it.</li>
      </ul>
      <p>This is consistent with the Consumer Contracts Regulations (UK) for digital content where supply has begun and the consumer has acknowledged their right of withdrawal will be lost, and with the Australian Consumer Law for digital products that work as described.</p>

      <h2>Your statutory rights</h2>
      <p>Nothing in this policy affects your statutory consumer rights. UK customers have rights under the Consumer Rights Act 2015. Australian customers have rights under the Australian Consumer Law. If a resource is faulty, not fit for purpose, or not as described, you&apos;re entitled to a remedy regardless of what this policy says.</p>

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
