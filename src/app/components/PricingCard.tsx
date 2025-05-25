import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string | number;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  buttonVariant?: "default" | "outline";
}

// Helper function to format price with smaller suffix after "/"
const formatPrice = (price: string | number) => {
  if (typeof price === 'number') {
    return <span className="font-bold text-3xl lg:text-5xl">{price}</span>;
  }
  if (price.includes("/")) {
    const [mainPrice, suffix] = price.split("/");
    return (
      <span className="inline">
        <span className="font-bold text-3xl lg:text-5xl">{mainPrice}</span>
        <span className="text-lg text-muted-foreground">/{suffix}</span>
      </span>
    );
  }
};

export default function PricingCard({
  title,
  price,
  description,
  features,
  isPopular = false,
  buttonText = "Sign up",
  buttonVariant = "outline",
}: PricingCardProps) {

  return (
    <Card className={`flex flex-col ${isPopular ? "border-primary" : ""}`}>
      <CardHeader className="text-center pb-2">
        {isPopular && (
          <Badge className="uppercase w-max self-center mb-3">
            Most popular
          </Badge>
        )}
        <CardTitle className={`${isPopular ? "!mb-7" : "mb-7"}`}>{title}</CardTitle>
        {formatPrice(price)}
      </CardHeader>
      <CardDescription className="text-center w-11/12 mx-auto">
        {description}
      </CardDescription>
      <CardContent className="flex-1">
        <ul className="lg:mt-7 space-y-2.5 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex space-x-2">
              <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={buttonVariant}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
