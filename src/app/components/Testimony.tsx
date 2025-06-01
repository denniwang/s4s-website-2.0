import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";


export default function Testimony() {
  const testimonials = [
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
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}