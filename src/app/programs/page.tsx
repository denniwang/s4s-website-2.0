import type { Metadata } from "next";
import PricingCols from "../components/ProgramsColumns";

export const metadata: Metadata = {
  title: "Programs - Students4Students",
  description: "Explore our college consulting programs. From essay help to complete application assistance, find the perfect mentorship package for your college journey.",
  keywords: [
    "college consulting programs",
    "college mentorship",
    "essay help packages",
    "college application assistance",
    "admissions counseling",
    "college prep programs"
  ],
  openGraph: {
    title: "Programs - Students4Students",
    description: "Explore our college consulting programs. From essay help to complete application assistance.",
    url: "https://trys4s.com/programs",
    type: "website",
  },
  alternates: {
    canonical: '/programs',
  },
};

export default function PricingPage() {
  const programsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'College Consulting Programs - Students4Students',
    description: 'Comprehensive college consulting programs with personalized mentorship and application assistance.',
    url: 'https://trys4s.com/programs',
    mainEntity: {
      '@type': 'Service',
      name: 'College Consulting Programs',
      description: 'Various college consulting packages to help students with college applications',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Students4Students'
      },
      serviceType: [
        'Essay Writing Assistance',
        'Application Help',
        'College Mentorship',
        'Admissions Counseling'
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programsJsonLd) }}
      />
      <div>
        <PricingCols />
      </div>
    </>
  );
}
