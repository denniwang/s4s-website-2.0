import { Label } from "@/components/ui/label";
import PricingCard from "./PricingCard";
import { Badge } from "@/components/ui/badge";

const pricingPlans = [
  //{
  //title: "Free",
  //price: "Free",
  //description: "Forever free",
  //features: ["1 user", "Plan features", "Product support"],
  //buttonVariant: "outline" as const,
  //},
  {
    title: "Async Writing",
    price: "15/round",
    description: "Everything you need to polish your college essay.",
    features: [
      "Expert writing advice",
      "48-hr turnaround available for +$15",
      "placeholder",
    ],
    buttonVariant: "outline" as const,
  },
  {
    title: "Sync Writing",
    price: "30/hr",
    description: "Banger college essay, from start to finish.",
    features: ["10 user", "Plan features", "Product support"],
    buttonVariant: "outline" as const,
  },
  {
    title: "Big Little Program",
    price: "50/month",
    description: "Everything you need for the college application and more.",
    features: ["2 user", "Plan features", "Product support"],
    isPopular: true,
    buttonVariant: "default" as const,
  },
];

export default function PricingGrid() {
  return (
    <div className="lg:grid lg:grid-cols-3 gap-3 lg:gap-10 items-stretch px-10 flex flex-col">
      {pricingPlans.map((plan, index) => (
        <PricingCard
          key={index}
          title={plan.title}
          price={plan.price}
          description={plan.description}
          features={plan.features}
          isPopular={plan.isPopular}
          buttonVariant={plan.buttonVariant}
        />
      ))}
    </div>
  );
}
