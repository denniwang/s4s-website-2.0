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
    if (sessionStorage.getItem('modal') != 'false') {
      setShowModal(true)
      //console.log('stopped showing modal')
    }
    //console.log('finished checking modal')
  }, [])

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
