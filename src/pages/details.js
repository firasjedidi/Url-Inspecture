import React,{useState,useEffect}  from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Table from '@/components/DetailsTable'
import api from '@/utils/api'
const NavBar = dynamic(() => import('@/components/NavBar'), {
  ssr: false,
})
const Details = () => {
    const router = useRouter();
    var { id ,check} = router.query;
    const [clicks,setClicks]= useState([]);
    const [err,setErr]= useState("");
    const clicksHandeler = async ()=>{
      try {
        const res = await api.get(`/clicks/${id}`,{withCredentials:true });
        if (res.data.clicks) {
          setClicks(res.data.clicks);
        }
        console.log(res.data);
      } catch (error) {
        console.log(error?.response?.data);
        setErr(error.response?.data || "something went wrong")
      }
    };
    const clicksCreate= async ()=>{
      try {
        const res = await api.post(`/clicks`,{id},{withCredentials:true });
        if (res.data.clicks) {
          setClicks(res.data.clicks);
        }
        console.log(res.data);
      } catch (error) {
        console.log(error?.response?.data);
        setErr(error?.response?.data || "something went wrong")
      }
    };
    const indexedHandler = async () => {
      try {
        const res = await api.get(`/urls/${id}`,{withCredentials:true });
        if (res.data.clicks) {
          setClicks(res.data.clicks);
        }
      } catch (error) {
        console.log(error);
      }
    }
    const checkHandler = async()=>{
      try {
        const res = await api.get(`/check/${id}`,{withCredentials:true });
        // if (res.data.clicks) {
        //   setClicks(res.data.clicks);
        // }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(id,"id",check);
    useEffect(()=>{
      if (router.isReady ) {
        if (check) {
          clicksCreate();
        } else {
          clicksHandeler();
        } 
      }
    },[router.isReady]);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <NavBar/>
      {clicks?.length > 0 && clicks != "undefined" ?
        <div className='mt-20 ml-20 '>
          <button 
            className='mt-4 bg-blue-500 w-16 mx-2'
            onClick={indexedHandler}
          >
            check indexed
          </button>
          <button 
            className='mt-4 bg-blue-500 w-16 mx-2'
            onClick={checkHandler}
          >
            check Handler
          </button>
          <Table id={id} clicks={clicks}   />
        </div> 
        :
        <h5>{err}</h5>
      }
    </div>
  )
}

export default Details