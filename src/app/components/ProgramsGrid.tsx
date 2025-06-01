import PricingCard from "./ProgramsCard";

const pricingPlans = [
	{
		title: "Async Writing",
		description: "Get expert feedback and polish your college essay at your own pace.",
		features: [
			"Detailed essay reviews by experienced mentors",
			"48-hour turnaround available for an additional $15",
			"Actionable suggestions to improve your writing",
		],
		buttonVariant: "outline" as const,
		link: "https://calendly.com/studs4students/15-min-free-trial",
	},
	{
		title: "Sync Writing",
		description: "Work one-on-one with a mentor to craft a standout college essay.",
		features: [
			"Live sessions with a dedicated mentor",
			"Step-by-step guidance from brainstorming to final draft",
			"Personalized feedback tailored to your story",
		],
		buttonVariant: "outline" as const,
		link: "https://calendly.com/studs4students/15-min-free-trial",
	},
	{
		title: "Big Little Program",
		description: "Comprehensive support for every aspect of your college application.",
		features: [
			"Dedicated mentor for the entire application process",
			"Support with essays, activity lists, and interviews",
			"Customized strategies to highlight your strengths",
		],
		isPopular: true,
		buttonVariant: "default" as const,
		link: "https://calendly.com/studs4students/15-min-free-trial",
	},
];

export default function PricingGrid() {
	return (
		<div className="lg:grid lg:grid-cols-3 gap-3 lg:gap-10 items-stretch px-10 flex flex-col">
			{pricingPlans.map((plan, index) => (
				<PricingCard
					key={index}
					title={plan.title}
					description={plan.description}
					features={plan.features}
					isPopular={plan.isPopular}
					buttonVariant={plan.buttonVariant}
				/>
			))}
		</div>
	);
}
