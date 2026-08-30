import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/layout/CartSidebar";
import { I18nProvider } from "@/components/layout/I18nProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ASCEND | Forged In Pressure",
    template: "%s | ASCEND",
  },
  description:
    "Premium streetwear for the disciplined. ASCEND represents resilience, growth, and becoming stronger through adversity. Built for those who refuse to stay average.",
  keywords: [
    "streetwear",
    "premium clothing",
    "ASCEND",
    "forged in pressure",
    "gym wear",
    "luxury streetwear",
    "motivation",
    "self improvement",
  ],
  openGraph: {
    title: "ASCEND | Forged In Pressure",
    description: "Premium streetwear for the disciplined.",
    type: "website",
    locale: "en_US",
    siteName: "ASCEND",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ASCEND - Premium Streetwear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCEND | Forged In Pressure",
    description: "Premium streetwear for the disciplined.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  themeColor: "#0A0A0A",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ASCEND",
              description: "Premium streetwear for the disciplined.",
              url: "https://ascend.com",
              logo: "https://ascend.com/logo.png",
              sameAs: [
                "https://instagram.com/ascend",
                "https://tiktok.com/@ascend",
                "https://facebook.com/ascend",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${oswald.variable} font-body antialiased`}>
        <I18nProvider>
          <Navbar />
          <CartSidebar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
