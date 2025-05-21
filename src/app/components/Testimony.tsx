"use client"
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const spotlightData = {
  image: {
    src: '/success/alyssa-neu.jpg',
    alt: 'Student Spotlight - Alyssa Diwale',
    width: 1000,
    height: 600
  },
  testimonial: {
    text: 'The Big Little Program was incredible. Going into my final year of high school, I was confused and honestly super stressed about college because I had no idea what I should be doing. My Big, Dennis, gave me invaluable advice for the entire application process. He helped me find clubs, extracurriculars, and competitions that strengthened my profile. I felt so much more confident and secure since we started meeting.',
    author: "- Alyssa Diwale, BHS'25"
  }
}

export default function Testimony() {
    useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])
  return (
    <div data-aos='flip-up'>
      <section className='mt-14 flex flex-col items-center self-center bg-background-secondary px-10 py-12 md:px-24'>
        <div className='lg:w-3/4'>
          <h2 className='pb-8 text-5xl font-extrabold'>🎓 Student Testimonial</h2>
          <div className='flex flex-col items-center justify-center gap-8 md:flex-row'>
            <div className='max-w-96 flex-1'>
              <Image
                width={spotlightData.image.width}
                height={spotlightData.image.height}
                className='rounded-md shadow-md'
                src={spotlightData.image.src}
                alt={spotlightData.image.alt}
              />
            </div>
            <div className='h-0.5 w-60 bg-primary md:h-60 md:w-0.5'></div>
            <div className='flex-1'>
              <p className='inline-block text-lg lg:text-2xl'>
                {spotlightData.testimonial.text}
              </p>
              <h2 className='pt-3 text-right text-xl font-bold'>
                {spotlightData.testimonial.author}
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}