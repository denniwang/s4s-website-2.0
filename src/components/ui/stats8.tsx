import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

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
    text: "Speak with a mentor today!",
    url: "https://calendly.com/studs4students/15-min-free-trial",
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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getGradientColor = (index: number) => {
    // Create different yellow gradients for each stat
    const scrollOffset = Math.sin(scrollY * 0.002 + index) * 20;
    const baseHue = 45 + scrollOffset; // Yellow range (45-65)
    const saturation = 85 + Math.cos(scrollY * 0.0015 + index) * 15; // 70-100%
    const lightness = 55 + Math.sin(scrollY * 0.003 + index * 2) * 10; // 45-65%
    
    return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
  };

  const getBackgroundGradient = () => {
    // Dynamic yellow gradient background
    const scrollOffset = scrollY * 0.0008;
    const hue1 = 50 + Math.sin(scrollOffset) * 10; // 40-60
    const hue2 = 45 + Math.cos(scrollOffset * 1.2) * 8; // 37-53
    const hue3 = 55 + Math.sin(scrollOffset * 0.8) * 12; // 43-67
    
    return `linear-gradient(135deg, 
      hsl(${hue1}, 25%, 97%) 0%, 
      hsl(${hue2}, 30%, 95%) 50%, 
      hsl(${hue3}, 20%, 96%) 100%)`;
  };
  return (
    <section 
      className="py-32 px-4 lg:px-20 transition-all duration-300"
      style={{ background: getBackgroundGradient() }}
    >
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
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className="flex flex-col gap-5 group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div 
                className="text-6xl font-bold bg-clip-text text-transparent transition-all duration-500"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${getGradientColor(index)}, ${getGradientColor(index + 2)})`,
                  filter: `saturate(${1 + Math.sin(scrollY * 0.001 + index) * 0.3})`,
                }}
              >
                {stat.value}
              </div>
              <p className="transition-colors duration-300 group-hover:text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stats8 };
