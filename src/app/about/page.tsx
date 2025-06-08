import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Students4Students - College Consulting Team for High Schoolers",
  description: "Meet the Students4Students team - expert college mentors from top universities providing college consulting for high schoolers. Learn about our mission to help students get into their dream colleges.",
  keywords: [
    "about students4students",
    "students 4 students team",
    "college consulting for high schoolers team",
    "college mentors",
    "admissions team",
    "college consulting team",
    "university mentors",
    "college guidance experts",
    "high school college consulting"
  ],
  openGraph: {
    title: "About Students4Students - College Consulting Team for High Schoolers",
    description: "Meet the Students4Students team - expert college mentors providing college consulting for high schoolers.",
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
