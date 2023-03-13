import dynamic from 'next/dynamic'
import React,{useState,useEffect} from 'react'
import Sign from '@/components/Sign'
import { decoded } from '@/utils/decoded'
// const decoded = dynamic(() => import('@/components/LoginGoogle'), {
//   ssr: false,
// })
const LoginGoogle = dynamic(() => import('@/components/LoginGoogle'), {
  ssr: false,
})
const NavBar = dynamic(() => import('@/components/NavBar'), {
  ssr: false,
})
import { useRouter } from 'next/router'
export default function Home() {
  const router = useRouter();
  const [auth,setauth] = useState(null);
  const [auth2,setauth2] = useState(null);
  const connect = (decode)=>{
    router.push({ pathname:'/home', query:{id:decode.email}},'/home');
  }
  console.log(auth);
  
  useEffect(()=>{
    const {decodedToken,decodeduser,checkedtoken,checkedauthedusertoken} =decoded()
    console.log(checkedauthedusertoken,"checkedauthedusertoken");
    if (router.isReady && checkedauthedusertoken) {   
      if (checkedauthedusertoken) {
        router.push('/test');
      }
      setauth(true);
    }else setauth(false);
  }, [router.isReady]);// eslint-disable-line react-hooks/exhaustive-deps 
  return (
    <main className=' max-w-5xl   mx-auto '>
      {auth ? (
        <>
          <LoginGoogle/>
        </>
      ) :
        (
          <>
          <NavBar/>
          <Sign/>
          </>
        )
      }
    </main>
  )
}

