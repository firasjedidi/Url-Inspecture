import React,{useEffect,useState} from 'react'
import HomeIndex from '@/container/HomeIndex'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import api from '@/utils/api'
import { decoded } from '@/utils/decoded'
const NavBar = dynamic(() => import('@/components/NavBar'), {
  ssr: false,
})
// import NavBar from '@/components/NavBar'

const HomePage = () => {
  const router = useRouter()
  const { id } = router.query;
  const [auth,setauth]=useState(null);

  const handelConnect = async()=>{
   
    try {
      const res = await api.post(`/connect`,{email:id||decodeduser.email},{withCredentials:true });
      if (res.data.email ) {
        console.log(res,"em");
      } else {
        console.log('no avialable websites');
      }
    } catch (error) {
        console.log(error,"connect issue");
    }
  }
  useEffect(()=>{
    const {decodedToken,decodeduser,checkedtoken,checkedauthedusertoken} =decoded()
    if (router.isReady && id || decodeduser) {
      handelConnect(decodeduser);
      setauth(true);
    }else setauth(false);
  }, [router.isReady,id]);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='flex   '>
      {auth && (
        <>
         <NavBar/>
         <HomeIndex auth={auth} id={id} />
        </>  
      )}
     {!auth && (
        <>
         you have to authentucate
        </>  
      )}
    </div>
  )
}

export default HomePage