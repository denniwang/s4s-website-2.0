import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/Footer";
import ClientLayout from "@/app/ClientLayout";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Students4Students - College Consulting & Admissions Mentorship",
    template: "%s | Students4Students"
  },
  description: "Expert college consulting and admissions mentorship. Get personalized guidance for essays, applications, and college prep. Free 15-minute trial available.",
  keywords: [
    "college consulting",
    "college admissions",
    "college mentorship",
    "college essays",
    "college applications",
    "admissions counseling",
    "college prep",
    "university applications",
    "college guidance",
    "admissions help",
    "college advisor",
    "SAT prep",
    "college planning"
  ],
  authors: [{ name: "Students4Students Team" }],
  creator: "Students4Students",
  publisher: "Students4Students",
  metadataBase: new URL('https://trys4s.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trys4s.com',
    title: 'Students4Students - College Consulting & Admissions Mentorship',
    description: 'Expert college consulting and admissions mentorship. Get personalized guidance for essays, applications, and college prep.',
    siteName: 'Students4Students',
    images: [
      {
        url: '/s4s-logo.png',
        width: 1200,
        height: 630,
        alt: 'Students4Students Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Students4Students - College Consulting & Admissions Mentorship',
    description: 'Expert college consulting and admissions mentorship. Get personalized guidance for essays, applications, and college prep.',
    images: ['/s4s-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification=XzLt15DBqhzacHqVF-LhnPznspz3J9Vew7G366q5ss4', // Add your Google Search Console verification code
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/s4s-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Students4Students',
    description: 'Expert college consulting and admissions mentorship program',
    url: 'https://trys4s.com',
    logo: 'https://trys4s.com',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Free trial',
      url: 'https://calendly.com/studs4students/15-min-free-trial',
    },
    sameAs: [
      'https://instagram.com/students.4students',
      'https://tiktok.com/@students.4students',
      'https://www.linkedin.com/company/trys4s'
    ],
    offers: {
      '@type': 'Offer',
      name: 'Free 15-minute College Consulting Trial',
      description: 'Get expert college admissions guidance with our free trial session',
      price: '0',
      priceCurrency: 'USD',
    },
    serviceType: [
      'College Consulting',
      'College Admissions',
      'Essay Writing Help',
      'Application Assistance',
      'College Mentorship'
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`} id="root">
        {/* Add Google Analytics - Replace with your actual GA4 Measurement ID */}
        <GoogleAnalytics GA_MEASUREMENT_ID="G-XXXXXXXXXX" />
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
