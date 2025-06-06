"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRightIcon,
  UserCheckIcon,
  HeartIcon,
  UsersIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
type CompanyValue = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  principles: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    image: string;
  };
  image?: string;
};

// Company values data
const companyValues: CompanyValue[] = [
  {
    id: "clients",
    name: "Client Success",
    description:
      "Our clients are at the heart of everything we do. We are dedicated to providing personalized guidance and support to help students achieve their academic and personal goals.",
    icon: HeartIcon,
    color: "text-blue-500",
    principles: [
      "Understand each student's unique needs and aspirations",
      "Provide tailored strategies for college applications",
      "Celebrate every milestone and success",
      "Continuously improve based on client feedback",
    ],
    testimonial: {
      quote:
        "The mentors are amazing...we got to bond and talk about our similar interests. I looked forward to every single meeting and my essays turned out amazing!",
      author: "Isabella",
      role: "High School Senior",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
  },
  {
    id: "mentors",
    name: "Dedicated Mentors",
    description:
      "Our mentors are passionate educators who bring their own successful college application experiences to guide and inspire students.",
    icon: UserCheckIcon,
    color: "text-yellow-500",
    principles: [
      "Share firsthand knowledge and expertise",
      "Foster a supportive and encouraging environment",
      "Empower students to take ownership of their journey",
      "Continuously learn and adapt to new trends",
    ],
    testimonial: {
      quote:
        "Being a mentor here is incredibly rewarding. I love helping students navigate the process and seeing their confidence grow.",
      author: "Alex Chen",
      role: "College Mentor",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?q=80&w=800",
  },
  {
    id: "parents",
    name: "Parent Partnership",
    description:
      "We work closely with parents to ensure they feel informed, supported, and confident throughout their child's college application journey.",
    icon: UsersIcon,
    color: "text-purple-500",
    principles: [
      "Maintain open and transparent communication",
      "Provide resources to help parents support their child",
      "Address concerns with empathy and understanding",
      "Celebrate successes as a team",
    ],
    testimonial: {
      quote:
        "The team kept us informed and involved every step of the way. It was reassuring to know our child was in such capable hands.",
      author: "Sarah Wilson",
      role: "Parent of a Student",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
  },
];

export default function AboutSectionCompanyValues() {
  const [activeValue, setActiveValue] = useState<string>(companyValues[0].id);

  // Get active value object
  const currentValue =
    companyValues.find((value) => value.id === activeValue) || companyValues[0];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
            Core Values
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Guides Our Decisions
          </h2>
          <p className="text-muted-foreground">
            Our values aren&apos;t just words on a wall—they&apos;re the
            principles that guide our daily actions and long-term vision,
            shaping our culture and driving our success.
          </p>
        </div>

        <Tabs
          value={activeValue}
          onValueChange={setActiveValue}
          className="space-y-8"
        >
          {/* Value selection - Tabs for md+ screens, Dropdown for smaller screens */}
          <div className="mb-8 flex justify-center">
            {/* Dropdown for small screens */}
            <div className="w-full md:hidden">
              <Select value={activeValue} onValueChange={setActiveValue}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a value" />
                </SelectTrigger>
                <SelectContent>
                  {companyValues.map((value) => (
                    <SelectItem key={value.id} value={value.id} >
                      <div className="flex items-center gap-2">
                        <value.icon className={cn("h-4 w-4 ", value.color)} />
                        <span>{value.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tabs for medium screens and above */}
            <TabsList className="hidden h-auto bg-transparent p-2 md:flex">
              {companyValues.map((value) => (
                <TabsTrigger
                  key={value.id}
                  value={value.id}
                  className={cn(
                    "data-[state=active]:bg-muted gap-2",
                    "data-[state=active]:border-border border border-transparent",
                    "hover:bg-gray-50 mx-2 p-2"
                  )}
                >
                  <value.icon className={cn("h-4 w-4", value.color)} />
                  <span>{value.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Value content */}
          <div className="grid items-center gap-8 md:grid-cols-12">
            {/* Left column: Value details */}
            <div className="space-y-6 md:col-span-6">
              <div className="mb-4 flex items-center gap-4">
                <div className={cn("rounded-xl p-2.5", "bg-muted")}>
                  <currentValue.icon
                    className={cn("h-7 w-7", currentValue.color)}
                  />
                </div>
                <h3 className="text-2xl font-bold">{currentValue.name}</h3>
              </div>

              <p className="text-muted-foreground text-lg">
                {currentValue.description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="font-medium">Key Principles:</h4>
                <ul className="space-y-2">
                  {currentValue.principles.map((principle, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowUpRightIcon
                        className={cn("mt-0.5 h-5 w-5", currentValue.color)}
                      />
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentValue.testimonial && (
                <Card className="bg-muted/30 mt-6 p-0">
                  <CardContent className="p-6">
                    <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={currentValue.testimonial.image}
                          alt={currentValue.testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {currentValue.testimonial.author}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {currentValue.testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">
                      &quot;{currentValue.testimonial.quote}&quot;
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right column: Value image */}
            <div className="md:col-span-6">
              {currentValue.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={currentValue.image}
                    alt={`Illustration of our ${currentValue.name} value`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-6">
                    <div
                      className={cn(
                        "inline-block rounded-lg px-3 py-1 text-sm text-white",
                        "bg-black/30 backdrop-blur-sm",
                      )}
                    >
                      {currentValue.name}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-muted flex aspect-[4/3] items-center justify-center rounded-xl">
                  <currentValue.icon
                    className={cn(
                      "h-24 w-24",
                      currentValue.color,
                      "opacity-25",
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </Tabs>

        {/* Call-to-action */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            These values guide every aspect of our work. Want to be part of a
            team that lives these values every day?
          </p>
          <Button asChild size="lg">
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfMgpxmVPS5ohae8BajQRrCoPI-BbxMnK32SGKdKKE6fXHUKQ/viewform" target="_blank">Join Our Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
