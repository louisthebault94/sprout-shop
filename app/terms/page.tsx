import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Terms of Service — Sprout" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="28 April 2026">
      <p>
        These terms cover your use of Sprout (the &quot;service&quot;). By creating an account or buying a resource, you agree to them. The service is operated by Louis Thebault, based in Australia.
      </p>

      <h2>1. Accounts</h2>
      <p>You need an account to purchase or download resources. You&apos;re responsible for keeping your sign-in details secure and for activity on your account. You must be at least 18 years old to buy from Sprout.</p>

      <h2>2. The resources we sell</h2>
      <p>Sprout sells digital teaching resources (PDFs and similar files) for use in Australian primary classrooms and home learning. Each listing describes what you&apos;re buying, including price, format, and Australian Curriculum v9.0 alignment.</p>

      <h2>3. Licence to use what you buy</h2>
      <p>When you buy a resource, you receive a non-exclusive, non-transferable licence to use it in your own teaching practice. You may:</p>
      <ul>
        <li>Print and use copies for the students in your own classroom or household.</li>
        <li>Save the file to your own devices for personal teaching use.</li>
      </ul>
      <p>You may not:</p>
      <ul>
        <li>Re-sell, redistribute, sub-licence, or share the resource with other teachers or websites.</li>
        <li>Upload the resource to file-sharing services or AI training datasets.</li>
        <li>Strip or remove copyright, branding, or attribution from the resource.</li>
      </ul>
      <p>The resources remain the intellectual property of Sprout (or its licensors).</p>

      <h2>4. Pricing and payment</h2>
      <p>Prices are shown in Australian dollars (AUD) and processed via Stripe. Where applicable, prices include GST. You authorise us to charge the payment method you provide for the total shown at checkout.</p>

      <h2>5. Delivery</h2>
      <p>Resources are delivered immediately as digital downloads inside your account library after payment is confirmed. You also receive an email receipt from Stripe.</p>

      <h2>6. Refunds and consumer guarantees</h2>
      <p>Our refund policy is set out separately at <a href="/refunds">/refunds</a> and forms part of these terms. Nothing in these terms excludes, restricts, or modifies any consumer guarantee, right or remedy under the Australian Consumer Law (Schedule 2 to the Competition and Consumer Act 2010 (Cth)).</p>

      <h2>7. Account suspension</h2>
      <p>We may suspend or terminate accounts that breach these terms — for example, by sharing purchased resources or attempting to abuse the service. Where possible we&apos;ll warn you first.</p>

      <h2>8. Service availability</h2>
      <p>We aim to keep Sprout running and accessible, but we don&apos;t guarantee uninterrupted access. We may take the service down for maintenance, updates, or for reasons outside our control.</p>

      <h2>9. Liability</h2>
      <p>To the extent permitted by law, our total liability to you for any claim arising from your use of Sprout is limited to the amount you paid us in the 12 months before the claim. We&apos;re not liable for indirect or consequential losses (e.g. lost profit, lost teaching time). Nothing in these terms limits your rights under the Australian Consumer Law or any liability that can&apos;t be limited by law.</p>

      <h2>10. Changes</h2>
      <p>We may update these terms occasionally. Material changes will be notified by email and take effect 14 days after notice.</p>

      <h2>11. Governing law</h2>
      <p>These terms are governed by the laws of New South Wales, Australia. Any dispute will be heard in the courts of New South Wales, except where the Australian Consumer Law gives you the right to bring proceedings in your home state or territory.</p>

      <h2>12. Contact</h2>
      <p>Questions about these terms: <a href="mailto:brett@thebault.co.uk">brett@thebault.co.uk</a>.</p>
    </LegalPage>
  );
}
