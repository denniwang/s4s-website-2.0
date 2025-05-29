import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, MinusIcon } from "lucide-react";
import React from "react";

interface PlanFeature {
  type: string;
  features: {
    name: string;
    asyncWriting: boolean;
    syncWriting: boolean;
    bigLittleProgram: boolean;
  }[];
}

const planFeatures: PlanFeature[] = [
  {
    type: "Writing Support",
    features: [
      {
        name: "Expert writing advice",
        asyncWriting: true,
        syncWriting: true,
        bigLittleProgram: true,
      },
      {
        name: "Real-time collaboration",
        asyncWriting: false,
        syncWriting: true,
        bigLittleProgram: true,
      },
      {
        name: "Rush service (48-hr turnaround)",
        asyncWriting: true,
        syncWriting: true,
        bigLittleProgram: true,
      },
      {
        name: "Unlimited revisions",
        asyncWriting: false,
        syncWriting: true,
        bigLittleProgram: true,
      },
    ],
  },
  {
    type: "Application Support",
    features: [
      {
        name: "Essay review and feedback",
        asyncWriting: true,
        syncWriting: true,
        bigLittleProgram: true,
      },
      {
        name: "Application strategy planning",
        asyncWriting: false,
        syncWriting: false,
        bigLittleProgram: true,
      },
      {
        name: "College list optimization",
        asyncWriting: false,
        syncWriting: false,
        bigLittleProgram: true,
      },
      {
        name: "Interview preparation",
        asyncWriting: false,
        syncWriting: false,
        bigLittleProgram: true,
      },
    ],
  },
  {
    type: "Additional Services",
    features: [
      {
        name: "Personal statement review",
        asyncWriting: true,
        syncWriting: true,
        bigLittleProgram: true,
      },
      {
        name: "Scholarship essay assistance",
        asyncWriting: false,
        syncWriting: true,
        bigLittleProgram: true,
      },
      {
        name: "Ongoing mentorship",
        asyncWriting: false,
        syncWriting: false,
        bigLittleProgram: true,
      },
      {
        name: "Priority support",
        asyncWriting: false,
        syncWriting: false,
        bigLittleProgram: true,
      },
    ],
  },
];

export default function PricingTable() {
  return (
    <div className="mt-20 lg:mt-32">
      <div className="lg:text-center mb-10 lg:mb-20">
        <h3 className="text-2xl font-semibold dark:text-white">
          Compare plans
        </h3>
      </div>

      {/* Desktop Table */}
      <Table className="hidden lg:table">
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted">
            <TableHead className="w-3/12 text-primary">Plans</TableHead>
            <TableHead className="w-3/12 text-primary text-lg font-medium text-center">
              Async Writing
            </TableHead>
            <TableHead className="w-3/12 text-primary text-lg font-medium text-center">
              Sync Writing
            </TableHead>
            <TableHead className="w-3/12 text-primary text-lg font-medium text-center">
              Big Little Program
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {planFeatures.map((featureType) => (
            <React.Fragment key={featureType.type}>
              <TableRow className="bg-muted/50">
                <TableCell colSpan={4} className="font-bold">
                  {featureType.type}
                </TableCell>
              </TableRow>
              {featureType.features.map((feature) => (
                <TableRow
                  key={feature.name}
                  className="text-muted-foreground"
                >
                  <TableCell>{feature.name}</TableCell>
                  <TableCell>
                    <div className="mx-auto w-min">
                      {feature.asyncWriting ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <MinusIcon className="h-5 w-5" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="mx-auto w-min">
                      {feature.syncWriting ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <MinusIcon className="h-5 w-5" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="mx-auto w-min">
                      {feature.bigLittleProgram ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <MinusIcon className="h-5 w-5" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      {/* Mobile Tables */}
      <div className="space-y-24 lg:hidden">
        <section>
          <div className="mb-4">
            <h4 className="text-xl font-medium">Async Writing</h4>
          </div>
          <Table>
            <TableBody>
              {planFeatures.map((featureType) => (
                <React.Fragment key={featureType.type}>
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableCell
                      colSpan={2}
                      className="w-10/12 text-primary font-bold"
                    >
                      {featureType.type}
                    </TableCell>
                  </TableRow>
                  {featureType.features.map((feature) => (
                    <TableRow
                      className="text-muted-foreground"
                      key={feature.name}
                    >
                      <TableCell className="w-11/12">
                        {feature.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {feature.asyncWriting ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <MinusIcon className="h-5 w-5" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </section>

        <section>
          <div className="mb-4">
            <h4 className="text-xl font-medium">Sync Writing</h4>
          </div>
          <Table>
            <TableBody>
              {planFeatures.map((featureType) => (
                <React.Fragment key={featureType.type}>
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableCell
                      colSpan={2}
                      className="w-10/12 text-primary font-bold"
                    >
                      {featureType.type}
                    </TableCell>
                  </TableRow>
                  {featureType.features.map((feature) => (
                    <TableRow
                      className="text-muted-foreground"
                      key={feature.name}
                    >
                      <TableCell className="w-11/12">
                        {feature.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {feature.syncWriting ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <MinusIcon className="h-5 w-5" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </section>

        <section>
          <div className="mb-4">
            <h4 className="text-xl font-medium">Big Little Program</h4>
          </div>
          <Table>
            <TableBody>
              {planFeatures.map((featureType) => (
                <React.Fragment key={featureType.type}>
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableCell
                      colSpan={2}
                      className="w-10/12 text-primary font-bold"
                    >
                      {featureType.type}
                    </TableCell>
                  </TableRow>
                  {featureType.features.map((feature) => (
                    <TableRow
                      className="text-muted-foreground"
                      key={feature.name}
                    >
                      <TableCell className="w-11/12">
                        {feature.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {feature.bigLittleProgram ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <MinusIcon className="h-5 w-5" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  );
}
