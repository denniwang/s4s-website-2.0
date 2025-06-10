"use client";
import { CollegeLogos } from "./components/CollegeLogos";
import { ScrollingText } from "./components/ScrollingText";
import Testimony from "./components/Testimony";
import { PopupButton } from "react-calendly";
import {
  TypewriterEffect,
} from "@/components/ui/typewriter-effect";
import FeatureSectionSimple from "@/components/ui/feature-section";
//import { Cta4 } from "@/components/ui/cta";
import { Stats8 } from "@/components/ui/stats8";

export default function Home() {
  const helpWith = [
    "essays",
    "activity lists",
    "Common App",
    "UC App",
    "transfers",
  ];

  // Add structured data for the homepage
  const homePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Students4Students - College Consulting for High Schoolers Home',
    description: 'Students4Students - Get expert college consulting for high schoolers. We help with essays, applications, and college prep.',
    url: 'https://trys4s.com',
    keywords: 'students4students, students 4 students, college consulting for high schoolers',
    mainEntity: {
      '@type': 'Service',
      name: 'College Consulting Services for High Schoolers',
      description: 'Students4Students personalized college mentorship program with expert guidance for high school students applying to college',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Students4Students',
        alternateName: 'Students 4 Students'
      },
      areaServed: 'United States',
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'High School Student'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'College Consulting Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Essay Writing Help'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Application Assistance'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'College Mentorship'
            }
          }
        ]
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <main
        className="flex flex-col justify-center items-center overflow-hidden"
        id="root"
      >
        <section className="h-[80vh] w-full relative bg-[url('/home/website-collage.png')] lg:bg-[url('/home/website-collage-wide.png')] bg-contain lg:bg-size-[40%]" 
          style={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
          }}
        >
          <div className="absolute inset-0 bg-white opacity-85"></div>
          <div className="absolute top-0 right-0 w-full lg:w-3/4 h-full flex flex-col justify-center items-center text-center p-4 md:p-8">
            <header>
              <h1 className="font-bold relative">
                <TypewriterEffect
                  words={[
                    { text: "Students4Students", className: "text-3xl md:text-6xl" },
                  ]}
                />
              </h1>
              <div className="sr-only">
                <h2>Students 4 Students - College Consulting for High Schoolers</h2>
                <p>Premier college consulting services for high school students. Get expert help with college applications, essays, and admissions guidance.</p>
              </div>
              <h2 className="text-lg md:text-2xl font-bold mb-8 flex items-center justify-center gap-2 relative">
                Get help with{" "}
                <span className="inline-block">
                  <ScrollingText
                    options={helpWith}
                    className="font-bold text-blue-500"
                  />{" "}
                </span>
                now
              </h2>
            </header>
            {typeof window !== "undefined" && document.getElementById("root") && (
              <PopupButton
                url="https://calendly.com/studs4students/15-min-free-trial"
                rootElement={document.getElementById("root") as HTMLElement}
                text="15-min free trial"
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-2xl font-bold relative"
              />
            )}
          </div>
        </section>
        
        <section aria-label="Partner Colleges">
          <CollegeLogos />
        </section>
        
        <section aria-label="Student Testimonials">
          <Testimony />
        </section>
        
        <section aria-label="Success Statistics">
          <Stats8 />
        </section>

        <section aria-label="Our Services">
          <FeatureSectionSimple />
        </section>
        
      </main>
    </>
  );
}
