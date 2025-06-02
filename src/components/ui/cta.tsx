import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

const defaultItems = [
  "Personalized essay feedback",
  "24/7 mentor text access",
  "Application strategy guidance",
  "Interview preparation",
  "Scholarship application support",
];

const Cta4 = ({
  title = "College Apps Shouldn't be Stressful",
  description = "Experience the difference with Students4Students Today",
  buttonText = "15-min free trial",
  buttonUrl = "https://calendly.com/studs4students/15-min-free-trial",
  items = defaultItems,
}: Cta4Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="max-w-5xl">
            <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-muted px-6 py-10 md:flex-row lg:px-20 lg:py-16">
              <div className="md:w-1/2">
                <h4 className="mb-1 text-2xl font-bold md:text-3xl">{title}</h4>
                <p className="text-muted-foreground">{description}</p>
                <Button className="mt-6" asChild>
                  <a href={buttonUrl} target="_blank">
                    {buttonText} <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
              <div className="md:w-1/3">
                <ul className="flex flex-col space-y-2 text-sm font-medium">
                  {items.map((item, idx) => (
                    <li className="flex items-center" key={idx}>
                      <Check className="mr-4 size-4 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta4 };
