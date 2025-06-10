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
  function noModal() {
    setShowModal(false)
    sessionStorage.setItem('modal', 'false')
  }

  const [activeTab, setActiveTab] = useState<'student' | 'parent'>('student');

  const studentBenefits = [
    "Build a standout application",
    "Write memorable essays", 
    "Find your perfect school match"
  ];

  const parentBenefits = [
    "Navigate without overwhelming your child",
    "Maximize financial aid opportunities",
    "Get peace of mind with clear strategy", 
    "Support without becoming the \"nagging parent\""
  ];

  const bookingUrl = 'https://calendly.com/studs4students/15-min-free-trial';

  return (
    <Credenza open={showModal} onOpenChange={setShowModal}>
      <CredenzaContent className='sm:max-w-md ' >
        <CredenzaHeader >
          <CredenzaTitle className='text-2xl font-semibold text-center mb-2'>
            Get Into Your Dream College
          </CredenzaTitle>
          
          {/* Tab Toggle */}
          <div className="flex flex-col items-center justify-center mb-4">
          <p>I am a...</p>

            <div className="inline-flex h-9 bg-gray-100 p-0.5 rounded-lg">
              <button
                onClick={() => setActiveTab('student')}
                className={`flex items-center justify-center px-4 h-8 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'student'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setActiveTab('parent')}
                className={`flex items-center justify-center px-4 h-8 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'parent'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Parent
              </button>
            </div>
          </div>
        </CredenzaHeader>

        <CredenzaDescription className='px-6 pb-4'>
          {/* Student Content */}
          {activeTab === 'student' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 text-center mb-4">
                Expert guidance tailored for students
              </p>
              
              <div className="space-y-3">
                {studentBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-900">
                    <div className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0 font-semibold">✓</div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 p-4 rounded-lg text-center mt-5">
                <div className="inline-block bg-amber-500 text-white px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide mb-2">
                  Free
                </div>
                <h3 className="text-base font-semibold text-amber-800 mb-1">
                  15-Minute Strategy Call
                </h3>
                <p className="text-sm text-amber-700">
                  Get clarity on your next steps
                </p>
              </div>
            </div>
          )}

          {/* Parent Content */}
          {activeTab === 'parent' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 text-center mb-4">
                Expert guidance for your child
              </p>
              
              <div className="space-y-3">
                {parentBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-900">
                    <div className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0 font-semibold">✓</div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 p-4 rounded-lg text-center mt-5">
                <div className="inline-block bg-amber-500 text-white px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide mb-2">
                  Free
                </div>
                <h3 className="text-base font-semibold text-amber-800 mb-1">
                  15-Minute Parent Consultation
                </h3>
                <p className="text-sm text-amber-700">
                  Learn how to best support your child
                </p>
              </div>
            </div>
          )}
        </CredenzaDescription>

        <CredenzaFooter className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <a
            href={bookingUrl}
            target='_blank'
            rel='noopener noreferrer'
            className="w-full sm:w-auto"
          >
            <Button
              className='duration-400 transform border transition-all hover:scale-105 bg-blue-500 hover:bg-blue-600 hover:shadow-lg w-full text-white'
            >
              <p className='text-sm md:text-base font-medium'>
                {activeTab === 'student' ? 'Get My Free Session' : 'Get My Free Consultation'}
              </p>
            </Button>
          </a>
          
          <CredenzaClose asChild>
            <Button
              variant='outline'
              className='text-gray-500 hover:text-red-500 border-gray-300 w-full sm:w-auto'
              onClick={noModal}
            >
              <p className='text-sm'>No thanks</p>
            </Button>
          </CredenzaClose>
          
        </CredenzaFooter>
          <div className="text-center w-full mb-2 mt-[-2]">
            <p className="text-xs text-gray-400 mt-2">No credit card required</p>
          </div>
      </CredenzaContent>
    </Credenza>)
}
