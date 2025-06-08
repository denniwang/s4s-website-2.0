import { Card, CardContent } from "@/components/ui/card";
import {
  UserCheckIcon,
  AwardIcon,
  HeartIcon,
  TrendingUpIcon,
} from "lucide-react";

const features = [
  {
    icon: UserCheckIcon,
    title: "Passionate Mentors",
    description:
      "Our mentors are deeply committed to teaching and helping students succeed in their college applications.",
  },
  {
    icon: AwardIcon,
    title: "Proven Expertise",
    description:
      "Each mentor has excelled in their own college application process, bringing valuable insights and strategies.",
  },
  {
    icon: HeartIcon,
    title: "Personalized Support",
    description:
      "We tailor our guidance to each student's unique needs, ensuring a supportive and effective experience.",
  },
  {
    icon: TrendingUpIcon,
    title: "Outstanding Results",
    description:
      "Both our students and mentors achieve admissions to top universities, reflecting the quality and relevance of our service.",
  },
];

export default function FeatureSectionSimple() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
        <h2 className="text-3xl font-bold">High-Quality, Relevant Guidance</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Our mentors are passionate about teaching and bring extensive experience
          from their own successful college application journeys. We focus on
          delivering personalized, up-to-date insights to help you achieve your
          goals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ">
        {features.map((feature) => (
          <Card key={feature.title} className="p-0 transition-all duration-300 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 group">
            <CardContent className="space-y-2 p-6">
              <feature.icon className="text-primary h-12 w-12 transiiton duration-200 group-hover:text-yellow-500" />
              <h3 className="font-bold transiiton duration-200 group-hover:text-yellow-500">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
