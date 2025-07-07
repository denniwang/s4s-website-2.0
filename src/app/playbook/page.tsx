import { Metadata } from "next";
import PlaybookClient from "./PlaybookClient";
import { getAllArticles } from "./utils/articles";

export const metadata: Metadata = {
  title: "S4S Playbook - College Admissions Guide",
  description: "Access our comprehensive college admissions playbook with expert tips, strategies, and insights to help you get into your dream college.",
  keywords: [
    "college admissions playbook",
    "college application guide",
    "college admissions tips",
    "college application strategies",
    "college admissions blog",
    "college application advice",
    "college admissions resources",
    "college application help"
  ],
  openGraph: {
    title: "S4S Playbook - College Admissions Guide",
    description: "Access our comprehensive college admissions playbook with expert tips, strategies, and insights to help you get into your dream college.",
    url: "https://trys4s.com/playbook",
  },
};

export default function PlaybookPage() {
  const articles = getAllArticles();
  return <PlaybookClient articles={articles} />;
} 