'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaFooter,
} from '@/components/ui/credenza'
import { LINKS } from "@/consts";

interface WebinarModalProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WebinarModal({ showModal, setShowModal }: WebinarModalProps) {

  const rsvpUrl = LINKS.webinarRSVP

  return (
    <Credenza open={showModal} onOpenChange={setShowModal}>
      <CredenzaContent className='sm:max-w-2xl gap-1'>
        <CredenzaHeader>
          <CredenzaTitle className='text-2xl pt-3 font-semibold text-center '>
            Discover Your Passion Early: A College Prep Webinar
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaDescription className='px-2 pb-4'>
          <div className="space-y-4 text-center">
            <p className="text-base text-gray-700 font-medium mb-2">
            Join S4S cofounder, Darsh, as he shares real insights on what your high schooler can do to explore their interests and build a compelling application!
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 p-4 rounded-lg text-left mx-auto max-w-xs space-y-2 text-md">
              <div className="flex items-center gap-2">
                <span>🗓️</span>
                <span>July 27th, Aug 3rd 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🕒</span>
                <span>2pm Pacific Time</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Virtual (Zoom link upon RSVP)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👥</span>
                <span>Parents AND students in grades 8–12</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Go ahead and RSVP now and set your student on the path to success.
            </p>
          </div>
        </CredenzaDescription>
        <CredenzaFooter className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <a
            href={rsvpUrl}
            target='_blank'
            rel='noopener noreferrer'
            className="w-full sm:w-auto"
          >
            <Button
              className='duration-400 transform border transition-all hover:scale-105 bg-blue-500 hover:bg-blue-600 hover:shadow-lg w-full text-white'
            >
              <p className='text-sm md:text-base font-medium'>RSVP Now</p>
            </Button>
          </a>
        </CredenzaFooter>
        <div className="text-center w-full mb-2 mt-[-2]">
          <p className="text-xs text-gray-400 mt-2">No cost to attend</p>
        </div>
      </CredenzaContent>
    </Credenza>
  )
}
