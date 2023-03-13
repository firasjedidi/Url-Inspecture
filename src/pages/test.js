import React from 'react'
import Sign from '@/components/Sign'
import dynamic from 'next/dynamic'
const LoginGoogle = dynamic(() => import('@/components/LoginGoogle'), {
  ssr: false,
})
const NavBar = dynamic(() => import('@/components/NavBar'), {
  ssr: false,
})
const test = () => {
  return (
    <>
    <NavBar/>
    <LoginGoogle/>
    </>
   
  )
}

export default test