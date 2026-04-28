import LegalPage from "@/components/LegalPage";

export const metadata = { title: "About — Sprout" };

export default function AboutPage() {
  return (
    <LegalPage title="About Sprout" updated="28 April 2026">
      <p>
        Sprout is a small, independent shop for primary teaching resources. Worksheets, lesson plans, and activity packs — designed by teachers, ready to print and teach with no extra prep.
      </p>

      <h2>Why Sprout exists</h2>
      <p>Most teachers spend evenings hunting for or rewriting resources. Sprout exists to give that time back: every resource is curriculum-aligned (Australian Curriculum v9.0 or the UK National Curriculum), proofread, and ready to use as-is.</p>

      <h2>Who runs it</h2>
      <p>Sprout is run by Brett Thebault from the UK. Get in touch via the <a href="/contact">contact page</a> if you have feedback, ideas for resources you&apos;d like to see, or you&apos;re a teacher interested in selling your own.</p>

      <h2>How it works</h2>
      <ul>
        <li>Browse or search the catalogue by subject, year group, or curriculum.</li>
        <li>Buy individual resources or grab the free ones for instant download.</li>
        <li>Everything you&apos;ve bought sits in your library for re-download any time.</li>
      </ul>
    </LegalPage>
  );
}
