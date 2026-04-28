import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Privacy Policy — Sprout" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="28 April 2026">
      <p>
        This policy explains what personal data Sprout collects, how we use it, and the rights you have over it. Sprout is operated by Louis Thebault, based in Australia.
      </p>

      <h2>1. What we collect</h2>
      <p>When you use Sprout, we may collect:</p>
      <ul>
        <li><strong>Account data</strong> — your name, email, and password hash, handled by our authentication provider Clerk.</li>
        <li><strong>Purchase data</strong> — which resources you bought, when, and the amount paid. Card details are handled by Stripe; we never see or store your full card number.</li>
        <li><strong>Communication data</strong> — anything you send us by email.</li>
        <li><strong>Technical data</strong> — IP address, browser type, and basic request logs needed to keep the site running and prevent abuse.</li>
      </ul>

      <h2>2. How we use it</h2>
      <ul>
        <li>To create and manage your account.</li>
        <li>To process payments and grant access to the resources you&apos;ve purchased.</li>
        <li>To send you transactional emails (receipts, password resets).</li>
        <li>To keep the service secure and prevent fraud.</li>
        <li>To comply with our legal obligations (e.g. tax records).</li>
      </ul>

      <h2>3. Who we share it with</h2>
      <p>We use third-party processors to run the service. They only receive what they need to do their job:</p>
      <ul>
        <li><strong>Clerk</strong> — authentication and user management.</li>
        <li><strong>Stripe</strong> — payment processing.</li>
        <li><strong>Neon</strong> — our database host.</li>
        <li><strong>Vercel</strong> — application hosting and file storage.</li>
      </ul>
      <p>We do not sell your personal data, and we do not share it with advertisers.</p>

      <h2>4. Cookies</h2>
      <p>We use only essential cookies needed to keep you signed in and remember your cart. We do not currently use analytics or advertising cookies.</p>

      <h2>5. Your rights under the Privacy Act</h2>
      <p>The Australian Privacy Act 1988 and its 13 Australian Privacy Principles (APPs) give you rights to:</p>
      <ul>
        <li>Access the personal information we hold about you.</li>
        <li>Ask us to correct it if it&apos;s wrong.</li>
        <li>Ask us to delete it (subject to legal record-keeping requirements).</li>
        <li>Withdraw consent for any non-essential processing.</li>
      </ul>
      <p>To exercise any of these rights, email <a href="mailto:brett@thebault.co.uk">brett@thebault.co.uk</a>. We&apos;ll respond within 30 days.</p>

      <h2>6. How long we keep it</h2>
      <p>We keep account and purchase records for as long as your account exists. After you close your account, we keep purchase records for 7 years to meet Australian tax-record obligations, then delete them.</p>

      <h2>7. International transfers</h2>
      <p>Some of our processors store data outside Australia (e.g. in the US or EU). Where that happens, we rely on the contractual safeguards (Standard Contractual Clauses, equivalent protections under APP 8) the providers have in place.</p>

      <h2>8. Children</h2>
      <p>Sprout is sold to adults (teachers, tutors, parents). We do not knowingly collect personal data from children under 18.</p>

      <h2>9. Changes</h2>
      <p>We&apos;ll update the &quot;last updated&quot; date at the top of this page when this policy changes. For significant changes we&apos;ll also notify you by email.</p>

      <h2>10. Contact and complaints</h2>
      <p>Questions or complaints: <a href="mailto:brett@thebault.co.uk">brett@thebault.co.uk</a>. If you&apos;re not satisfied with our response you can complain to the Office of the Australian Information Commissioner at <a href="https://www.oaic.gov.au">oaic.gov.au</a>.</p>
    </LegalPage>
  );
}
