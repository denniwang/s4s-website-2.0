"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { STUDENT_SLIDES as SLIDES } from "@/consts";

interface SuccessSlideProps {
  img: string;
  title: string;
  school: string;
  schoolLogo: string;
  year: string;
  big: string;
}

const SuccessSlide = ({
  img,
  title,
  school,
  schoolLogo,
  year,
  big,
}: SuccessSlideProps) => {
  return (
    <CarouselItem className="flex flex-row justify-center items-center lg:w-[20vw] w-[50vw] gap-2 bg-accent p-0 rounded-xl">
      <div className="relative size-full h-[45vh] object-cover md:h-[65vh] w-1/2 p-0 rounded-l-xl overflow-hidden">
        <Image
          src={`/success/${img}`}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-l-xl"
        />
      </div>
      <div className="flex w-1/2 flex-col gap-0 px-3 ">
        <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
        <div className="flex flex-col bg-buttonSecondary text-left rounded-md pt-2">
          <div className="flex flex-row items-center gap-2">
            <div className="h-10 w-10 overflow-hidden">
              <Image
                src={`/logos/${schoolLogo}.png`}
                width={50}
                height={50}
                alt={schoolLogo}
              />
            </div>
            <p>
              <span className="font-extrabold">
                {school} {year}
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-buttonSecondary text-left rounded-md">
          <div className="flex flex-row items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={`/face/${big}.png`}
                width={50}
                height={50}
                alt={big}
              />
            </div>
            <p>
              <span className="font-extrabold underline">Big:</span> {big}
            </p>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};

export default function StudentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <h1 className="text-4xl font-bold mb-8">Student Success</h1>
      <Carousel
        plugins={
          [
            //Autoplay({ delay: 3000,}),
          ]
        }
        className="w-full max-w-5xl"
        opts={{
          loop: true,
          align: "center",
        }}
      >
        <CarouselContent>
          {SLIDES.map((slide, index) => (
            <SuccessSlide
              key={index}
              img={slide.img}
              title={slide.title}
              school={slide.school}
              schoolLogo={slide.schoolLogo}
              year={slide.year}
              big={slide.big}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
