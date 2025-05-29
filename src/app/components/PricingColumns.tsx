import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";
import PricingGrid from "./PricingGrid";
import PricingTable from "./PricingTable";

interface PlanFeature {
  type: string;
  features: {
    name: string;
    asyncWriting: boolean;
    syncWriting: boolean;
    bigLittleProgram: boolean;
  }[];
}

export default function PricingSectionCards() {
  return (
    <>
      {/* Pricing */}
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Pricing
          </h2>
          <p className="mt-1 text-muted-foreground">
            Whatever your status, our offers evolve according to your needs.
          </p>
        </div>
        {/* End Title */}
        {/* Switch */}
        <div className="flex justify-center items-end w-full"></div>{" "}
        {/* End Switch */}
        {/* Grid */}
        <PricingGrid />
        {/* End Grid */}
        {/* Comparison table */}
        <PricingTable />
        {/* End Comparison table */}
      </div>
      {/* End Pricing */}
    </>
  );
}
