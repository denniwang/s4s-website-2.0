'use client'

import React, { useEffect, useState, useCallback } from 'react'
import NavMenu from './components/NavMenu'
//import Modal from './components/Modal'
import WebinarModal from './components/WebinarModal'


interface ClientLayoutProps {
  children: React.ReactNode
}

// Add your URLs here where you want the modal to appear
const MODAL_TRIGGER_URLS = [
  '/', // Home page
  '/about', // About page
  '/programs', // Programs page
  // Add more URLs as needed
  // '/college-consulting-for-high-schoolers',
  // '/contact',
]

// Pages where modal should NEVER appear
const MODAL_EXCLUDED_URLS = [
  '/auth/signin',
  '/auth/signup', 
  '/auth/error',
  '/auth/oauth-complete',
  '/api/auth',
  '/api/auth/signup',
  '/api/auth/complete-profile',
]

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showModal, setShowModal] = useState(false)



  const handleShowModal = useCallback(() => {
    setShowModal(true)
  }, [])

  useEffect(() => {
    // Check if current URL should trigger modal
    const currentPath = window.location.pathname
    
    // Check if current page is excluded from modal
    const isExcludedPage = MODAL_EXCLUDED_URLS.some(excludedPath => 
      currentPath.startsWith(excludedPath)
    )
    
    // Check if current page should trigger modal
    const shouldTriggerOnCurrentPage = MODAL_TRIGGER_URLS.includes(currentPath)
    
    // Debug logging
    console.log('Modal Debug:', {
      currentPath,
      isExcludedPage,
      shouldTriggerOnCurrentPage,
      modalDismissed: sessionStorage.getItem('modal') === 'false',
      showModal
    })
    
    // Don't show modal if:
    // 1. User already dismissed it
    // 2. It's already been shown
    // 3. Current page is not in the trigger list
    // 4. Current page is in the excluded list
    if (sessionStorage.getItem('modal') === 'false' || showModal || !shouldTriggerOnCurrentPage || isExcludedPage) {
      console.log('Modal blocked:', {
        reason: sessionStorage.getItem('modal') === 'false' ? 'dismissed' : 
                showModal ? 'already shown' : 
                isExcludedPage ? 'excluded page' : 'not in trigger list'
      })
      return
    }

    let timeSpent = 0
    let isEngaged = false
    let modalTriggered = false // Prevent multiple triggers

    // Track user engagement
    const handleScroll = () => {
      if (modalTriggered) return
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 30) {
        isEngaged = true
      }
    }

    const handleMouseMove = () => {
      if (modalTriggered) return
      isEngaged = true
    }

    const handleClick = () => {
      if (modalTriggered) return
      isEngaged = true
    }

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (modalTriggered || showModal) return
      if (e.clientY <= 0) {
        modalTriggered = true
        handleShowModal()
      }
    }

    // Smart timing logic
    const checkShowModal = () => {
      if (modalTriggered) return
      
      timeSpent += 1000
      
      // Show modal if user is engaged AND has spent enough time
      if (isEngaged && timeSpent >= 15000) { // 15 seconds + engagement
        modalTriggered = true
        handleShowModal()
        return
      }
      
      // Fallback: show after 45 seconds regardless (but still respectful)
      if (timeSpent >= 45000) {
        modalTriggered = true
        handleShowModal()
      }
    }

    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    // Start timing
    const timer = setInterval(checkShowModal, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearInterval(timer)
    }
  }, [handleShowModal, showModal]) // Added missing dependencies

  return (
    <>
      <div className="w-full flex flex-row-reverse p-2">
        <NavMenu />
      </div>
      <WebinarModal showModal={showModal} setShowModal={setShowModal} />
      {children}
    </>
  )
}
