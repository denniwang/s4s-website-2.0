import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";


export default function Testimony() {
  const testimonials = [
    {
      quote:
        '"Having Darsh as a mentor covered everything, from editing every single one of my PIQ’s with thoughtful feedback… as a first generation student, it was incredible reassuring to have someone to text and communicate with throughout this whole process."',
      name: "Angeline Nguyen",
      designation: "UCI '29",
      src: "angeline-uci.jpeg",
    },
    {
      quote:
        "\"Dennis took the time to get to know my story, my background, and my passions. With his guidance, I was able to write an amazing personal statement that was authentic and captured who I am. His advice and feedback made me feel really confident as he supported me every step of the way.\"",
      name: "Alyssa Diwale",
      designation: "Northeastern '29",
      src: "alyssa-neu.jpg",
    },
    {
      quote:
        '"S4S Writing Wonders transformed my essays and really helped me reflect how I\'ve implemented my passions throughout my four years in high school. With their help, I got into every single UC and I couldn\'t be more thankful. They really understood the process and they made it so much less stressful for me."',
      name: "Love Afolabi",
      designation: "UC Berkeley '29",
      src: "love-berk.jpeg",
    },
    {
      quote:
        '"The mentors are amazing... we got to bond and talk about our similar interests. I looked forward to every single meeting and my essays turned out amazing!"',
      name: "Isabella Inio",
      designation: "SDSU '29",
      src: "isabella_cropped.jpeg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}