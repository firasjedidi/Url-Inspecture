import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
const NavBar = dynamic(() => import('@/components/NavBar'), {
  ssr: false,
})
import GroupCompareContainer from '@/container/GroupCompareContainer'

const GroupCompare = () => {   
  const router = useRouter()
  const {id} = router.query
  return (
    <div className=''>
      {
        id? 
          <>
            <NavBar/>
            <GroupCompareContainer/>
          </>
        :
        <h1>
          not authenicated user
        </h1>
      }
     
    </div>
  )
}

export default GroupCompare