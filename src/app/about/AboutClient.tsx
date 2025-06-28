"use client";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AboutSectionCompanyValues from "@/components/ui/values";
import Link from "next/link";
import { LINKS } from "@/consts";

export default function AboutClient() {
  const team = [
    {
      img: "Andrew.jpg",
      name: "Andrew Chen",
      school: "UW Seattle '27",
      desc: "Andrew is a CS TA and applied math major! Ever laughed or cringed at any of our TikTok’s? He’s the guy to blame.",
      delay: 0,
    },
    {
      img: "Darsh.jpg",
      name: "Darsh Verma",
      school: "UCLA '27",
      desc: "Darsh is a math and CS major, and loves to grill. He will happily send you his Tandoori Chicken recipe (only if you buy S4S shares tho lol).",
      delay: 200,
    },
    {
      img: "Dennis.jpg",
      name: "Dennis Wang",
      school: "Northeastern University '27",
      desc: "Howdy! I made everything you’re seeing so far. I’m a Business + CS major at Northeastern. if you have website feedback, DMs are open 😉",
      delay: 300,
    },
    {
      img: "Keyon.jpg",
      name: "Keyon Jazayeri",
      school: "UC Irvine '27",
      desc: "Keyon is a CS major, and loves to practice jiu-jitsu in his free time. You’ll probably meet him in an interview if you apply to join the team 😱 Good luck!",
      delay: 200,
    },
    {
      img: "Steven.jpg",
      name: "Steven Zhang",
      school: "Berkeley '27",
      desc: "Steven is a Microbial Biology major on the Pre-Med track at UC Berkeley. He loves working in the lab, playing sports and music, and working out in his free time.",
      delay: 200,
    },
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className="w-full flex flex-col items-center px-4 py-6" >
      <header className="text-center h-[50vh] flex flex-col justify-center gap-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-duration="800">
          About Students4Students
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
          We&apos;re a team of college students passionate about helping high schoolers navigate the college admissions process.
        </p>
        <p data-aos="fade-up" data-aos-delay="500" className="text-5xl mt-5" data-aos-duration="1500">🎓</p>
      </header>

<div className="h-0.5 w-64 bg-black" />
      <section className="w-full max-w-6xl mb-16">
        <AboutSectionCompanyValues />
      </section>

      <section className="w-full max-w-6xl" aria-label="Our Team">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-aos="fade-up">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center justify-center">
        
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
        <div className="w-full text-center mb-[-10] mt-10">
        <Link 
            href={LINKS.programs}
            className="inline-block bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 ease-in-out hover:-translate-y-1"
          >
            Find the best plan for you! ✨
          </Link>
        </div>
      </section>
    </main>
  );
}
