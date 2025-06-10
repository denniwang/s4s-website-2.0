'use client'

import React, { useEffect, useState } from 'react'
import NavMenu from './components/NavMenu'
import Modal from './components/Modal'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Don't show modal if user already dismissed it or if it's already been shown
    if (sessionStorage.getItem('modal') === 'false' || showModal) {
      return
    }

    let hasScrolled = false
    let timeSpent = 0
    let isEngaged = false
    let modalTriggered = false // Prevent multiple triggers

    // Track user engagement
    const handleScroll = () => {
      if (modalTriggered) return
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 30) {
        hasScrolled = true
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
        setShowModal(true)
      }
    }

    // Smart timing logic
    const checkShowModal = () => {
      if (modalTriggered) return
      
      timeSpent += 1000
      
      // Show modal if user is engaged AND has spent enough time
      if (isEngaged && timeSpent >= 15000) { // 15 seconds + engagement
        modalTriggered = true
        setShowModal(true)
        return
      }
      
      // Fallback: show after 45 seconds regardless (but still respectful)
      if (timeSpent >= 45000) {
        modalTriggered = true
        setShowModal(true)
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
  }, []) // Removed showModal dependency to prevent re-running effect

  return (
    <>
      <div className="w-full flex flex-row-reverse p-2">
        <NavMenu />
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      {children}
    </>
  )
}
