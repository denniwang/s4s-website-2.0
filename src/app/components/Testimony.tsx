import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";


export default function Testimony() {
  const testimonials = [
    {
      quote:
        "Having Darsh as a mentor covered everything, from editing every single one of my PIQ’s with thoughtful feedback… as a first generation student, it was incredible reassuring to have someone to text and communicate with throughout this whole process.",
      name: "Angeline Nguyen",
      designation: "UCI '29",
      src: "angeline-uci.png",
    },
    {
      quote:
        "Alyssa did a wonderful job of working alongside Dennis, one of our mentors, this past cycle and will be taking her talents to Northeastern in the upcoming fall!",
      name: "Alyssa Diwale",
      designation: "Northeastern '29",
      src: "alyssa-neu.jpg",
    },
    {
      quote:
        "Love went through multiple grueling rounds of essay revisions with our writing experts. She is easily one of our strongest writers now and will be joining the UC Berkeley class of '29",
      name: "Love Afolabi",
      designation: "UC Berkeley '29",
      src: "love-berk.jpg",
    },
    {
      quote:
        "The mentors are amazing...we got to bond and talk about our similar interests. I looked forward to every single meeting and my essays turned out amazing!",
      name: "Isabella Inio ",
      designation: "SDSU '29",
      src: "isabella.jpeg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}