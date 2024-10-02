"use client"
import React from 'react'
import HomePostComp from './HomePostComp'
import { useSession } from 'next-auth/react'

const HomeComponent = () => {

  const {data} = useSession();

  return (
    <div className='flex-1 flex flex-col gap-1'>
        <h3 className=' font-bold  text-center'>Home</h3>
         <hr className=' w-auto border-[1px]' />
         {
           data &&
           <div className=' flex gap-2 border-b-2 pb-4 pl-1'>
           <HomePostComp/>
         </div>
         }
        
    </div>
  )
}

export default HomeComponent