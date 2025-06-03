import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us - Students4Students",
  description: "Meet our team of college mentors from top universities. Learn about our mission to provide personalized college consulting and admissions guidance to students.",
  keywords: [
    "about students4students",
    "college mentors",
    "admissions team",
    "college consulting team",
    "university mentors",
    "college guidance experts"
  ],
  openGraph: {
    title: "About Us - Students4Students",
    description: "Meet our team of college mentors from top universities. Learn about our mission to provide personalized college consulting and admissions guidance.",
    url: "https://trys4s.com/about",
    type: "website",
  },
  alternates: {
    canonical: '/about',
  },
};

export default function About() {
  return <AboutClient />;
}
