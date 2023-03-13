
import Image from 'next/image'
import React,{useState} from 'react'
import { FcGoogle } from "react-icons/fc";
const login = () => {
   const auth = () =>{
    window.location = 'http://localhost:5000/api/redirect'
  }
  return (
    <>
      <div className='mt-20 max-w-xl mx-auto border shadow p-6 border-[#DDDDDD] '>
        <h2 className='text-xl text-center text-[#287CE4]' >Welcome to Url-Inspecter</h2>
        <p className='text-sm dark:text-gray-900 p-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <a className='flex justify-center items-center space-x-2 bg-slate-50 w-48 h-10 mx-auto my-3 cursor-pointer ' onClick={auth}>
          <FcGoogle size={25} />
          <span className='text-black'>SignIn</span>
        </a>
      </div>
    </>
  )
}

export default login