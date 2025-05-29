"use client";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function About() {
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
      delay: 100,
    },

    {
      img: "Darsh.jpg",
      name: "Darsh Verma",
      school: "UCLA '27",
      desc: "Darsh is a math and CS major at UCLA, and loves working out, playing cricket, and cooking in his free time. He is on track to solving the Riemann Hypothesis by the end of his career.",
      delay: 200,
    },

    {
      img: "Dennis.jpg",
      name: "Dennis Wang",
      school: "Northeastern University'27",
      desc: "Dennis is a CS + Business major at NEU, he loves to play tennis and participate in hackathons. He aspires to be retired by 30.",
      delay: 300,
    },
  ];
  function PersonCard({
    img,
    name,
    college,
    children,
    delay,
  }: {
    img: string;
    name: string;
    college: string;
    children: React.ReactNode;
    delay: number;
  }) {
    return (
      <div
        className="space-between animate-hidden flex w-4/5 flex-col items-center gap-5 lg:w-1/5 "
        data-aos="fade-right"
        data-aos-delay={delay}
      >
        <div className="shadow-md">
          <Image
            src={"/team/" + img}
            width={500}
            height={200}
            alt={name}
            className="shadow-md"
          />
        </div>
        <div className="flex flex-col justify-center p-2">
          <h2 className="text-2xl">{name}</h2>
          <br></br>
          <p className="italic">{college}</p>
          <br></br>
          <p className="">{children}</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <main className="flex flex-row justify-center">
      <div className="flex w-11/12 flex-col justify-center gap-8 lg:w-4/5">
        <h2 className="pt-10 text-4xl font-bold">Our team!</h2>

        <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
          {team.map((person) => {
            return (
              <PersonCard
                img={person.img}
                name={person.name}
                college={person.school}
                key={person.name}
                delay={person.delay}
              >
                {person.desc}
              </PersonCard>
            );
          })}
        </div>
      </div>
    </main>
  );
}
