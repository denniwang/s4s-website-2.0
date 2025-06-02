import { ArrowRight } from "lucide-react";

interface Stats8Props {
  heading?: string;
  description?: string;
  link?: {
    text: string;
    url: string;
  };
  stats?: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}

const Stats8 = ({
  heading = "The mentorship advantage",
  description = "Students with relatable mentors see significant improvements in college admissions outcomes",
  link = {
    text: "Read our student success stories",
    url: "/success",
  },
  stats = [
    {
      id: "stat-1",
      value: "85%",
      label: "of mentored students get into their top 3 colleges",
    },
    {
      id: "stat-2",
      value: "73%",
      label: "increase in scholarship funding with mentor guidance",
    },
    {
      id: "stat-3",
      value: "3.5x",
      label: "more likely to pursue dream schools with confidence",
    },
    {
      id: "stat-4",
      value: "92%",
      label: "of students say relatable mentors were crucial to their success",
    },
  ],
}: Stats8Props) => {
  return (
    <section className="py-32 px-4 lg:px-20">
      <div className="container">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold md:text-4xl">{heading}</h2>
          <p>{description}</p>
          <a
            href={link.url}
            className="flex items-center gap-1 font-bold hover:underline"
          >
            {link.text}
            <ArrowRight className="h-auto w-4" />
          </a>
        </div>
        <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-5">
              <div className="text-6xl font-bold">{stat.value}</div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stats8 };
