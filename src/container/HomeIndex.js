import React,{useState,useEffect} from 'react'
import api from '@/utils/api'
import { useRouter } from 'next/router'
import Search from '@/components/Search'
import SitesUrlTable from '@/components/SitesUrlTable'
import { decoded } from '@/utils/decoded'
const HomeIndex = ({auth,id}) => {
  const [sites,setSites]=useState([]);
  const [info,setinfo]=useState({siteUrl:"",inspect:""});
  const router = useRouter();
  const handelSites = async()=>{
    const {decodedToken,decodeduser,checkedtoken,checkedauthedusertoken} =decoded()
    try {
      const res = await api.get(`/sites/${id || decodeduser.email}`,{withCredentials:true });  
      if (res.data.sites) {
        setSites(res.data.sites);
        setinfo(prev=>({...prev,siteUrl:res.data.sites[0]?.siteUrl}));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
   handelSites();
  },[id])// eslint-disable-line react-hooks/exhaustive-deps

  const disabled = sites.length ? false : true ;
  return (
    <div className='flex-1 m-20 items-center justify-center h-full with-full'>
      <Search info={info} setinfo={setinfo} sites={sites} disabled={disabled}  />
      <SitesUrlTable sites={sites}  />
    </div>
  )
}

export default HomeIndex
