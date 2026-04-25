import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import HeaderWrapper from "@/components/HeaderWrapper";

export const metadata: Metadata = {
  title: "Sprout — Ready-to-teach resources for primary classrooms",
  description:
    "Browse hundreds of curriculum-aligned worksheets, lesson plans and activity packs — download instantly after purchase.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&family=Nunito:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <HeaderWrapper />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
