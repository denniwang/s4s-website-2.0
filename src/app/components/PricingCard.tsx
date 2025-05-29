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
import { Label } from "@radix-ui/react-label";
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
  if (typeof price === "number") {
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
    <Card
      className={`flex flex-col ${
        isPopular ? "border-blue-500 mt-15 lg:mt-0" : ""
      } relative`}
      id={title}
    >
      {isPopular && (
        <Label
          htmlFor="payment-schedule"
          className="absolute ms-3 right-2 -top-12"
          id={title}
        >
          <span className="flex items-end w-full">
            <svg
              className="w-14 h-8 -me-6"
              width={45}
              height={25}
              viewBox="0 0 45 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                fill="currentColor"
                className="text-muted-foreground"
              />
            </svg>
            <Badge className="mt-3 uppercase bg-blue-600">
              50% summer sale
            </Badge>
          </span>
        </Label>
      )}
      <CardHeader className="text-center pb-2">
        {isPopular && (
          <Badge className="uppercase w-max self-center mb-3 bg-blue-600">
            Most popular
          </Badge>
        )}
        <CardTitle className={`${isPopular ? "!mb-7" : "mb-7"}`}>
          {title}
        </CardTitle>
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
        <Button
          className={`w-full ${isPopular ? "bg-blue-600" : ""}`}
          variant={buttonVariant}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
