'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaClose,
} from '@/components/ui/credenza'

// Add props interface so the Modal can be controlled by its parent
interface ModalProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({ showModal, setShowModal }: ModalProps) {
  const [delayDone, setDelayDone] = useState(false)

  useEffect(() => {
    // Check if the user has already dismissed the modal in this session.
    if (sessionStorage.getItem('modal') === 'false') {
      return
    }

    // Otherwise, delay showing the modal for 5 seconds.
    const timer = setTimeout(() => {
      setDelayDone(true)
      setShowModal(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [setShowModal])

  function noModal() {
    setShowModal(false)
    sessionStorage.setItem('modal', 'false')
  }

  return (
    <Credenza open={delayDone && showModal} onOpenChange={setShowModal}>
      <CredenzaContent className='sm:max-w-3xl'>
        <CredenzaHeader>
          <CredenzaTitle className='text-3xl font-semibold'>
            LIMITED TIME OFFER
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaDescription className='text-md leading-relaxed md:my-4 md:text-lg px-5'>
          Want to get a competitve edge in the college application
          process? Book a{' '}
          <span className='font-bold'>free 15-minute trial </span> on
          us today!{' '}
        </CredenzaDescription>
        <CredenzaFooter className='flex justify-end gap-3'>
          <a
            href='https://calendly.com/studs4students/15-min-free-trial'
            target='_blank'
          >
            <Button
              className='duration-400 transform border transition-all hover:scale-110 bg-blue-500 hover:shadow-lg w-full lg:w-auto'
            >
              <p className='text-md md:text-lg'>Free Trial</p>
            </Button>
          </a>

          <CredenzaClose asChild>
            <Button
              variant='outline'
              className='text-red-500'
              onClick={noModal}
            >
              No thanks!
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
