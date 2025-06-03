"use client";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AboutSectionCompanyValues from "@/components/ui/values";

export default function AboutClient() {
  const team = [
    {
      img: "Andrew.jpg",
      name: "Andrew Chen",
      school: "UW Seattle '27",
      desc: "Andrew is a computer science TA and an applied math major at the University of Washington. Ever laughed or cringed at any of our TikToks? He's the guy to blame.",
      delay: 0,
    },
    {
      img: "Keyon.jpg",
      name: "Keyon Jazayeri",
      school: "UC Irvine '27",
      desc: "Keyon is a stellar student at UCI, majoring in Computer Science. He loves to work on startups and practices jiu jitsu in his free time.",
      delay: 200,
    },
    {
      img: "Dennis.jpg",
      name: "Dennis Wang",
      school: "Northeastern University '27",
      desc: "Dennis is a CS + Business major at NEU, he loves to play tennis and participate in hackathons. He aspires to be retired by 30.",
      delay: 300,
    },
    {
      img: "Darsh.jpg",
      name: "Darsh Verma",
      school: "UCLA '27",
      desc: "Darsh is a math and CS major at UCLA, and loves working out, playing cricket, and cooking in his free time. He is on track to solving the Riemann Hypothesis by the end of his career.",
      delay: 200,
    },
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className="w-full flex flex-col items-center px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4" data-aos="fade-up">
          About Students4Students
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          We&apos;re a team of college students passionate about helping high schoolers navigate the college admissions process.
        </p>
      </header>

      <section className="w-full max-w-6xl mb-16">
        <AboutSectionCompanyValues />
      </section>

      <section className="w-full max-w-6xl" aria-label="Our Team">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-aos="fade-up">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <article 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-6 text-center"
              data-aos="fade-up"
              data-aos-delay={member.delay}
            >
              <div className="mb-4">
                <Image
                  src={`/team/${member.img}`}
                  alt={`${member.name} - ${member.school}`}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-blue-600 font-semibold mb-3">{member.school}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
