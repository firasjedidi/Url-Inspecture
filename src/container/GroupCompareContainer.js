import React,{useEffect,useState,} from 'react'
import api from '@/utils/api'
import CompareTable from '@/components/CompareTable';
import Calender from '@/components/Calender';
import { HiOutlineChevronDown} from "react-icons/hi2";
import { format} from 'date-fns';
import { decoded } from '@/utils/decoded'
const date = new Date()
const maxDate = new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-4}`)
const minDate = new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-5}`)
const forematedMax = format(maxDate,'yyyy-MM-dd')
const forematedMin = format(minDate,'yyyy-MM-dd')
const inatailState={
    siteUrl:"",
    endDate: forematedMax,
    startDate:forematedMax,
    type: "WEB",
    dimensions:["QUERY"],
    rowLimit:10
}
const inatailState2={
    siteUrl:"",
    endDate:forematedMin,
    startDate:forematedMin,
    type: "WEB",
    dimensions:["QUERY"],
    rowLimit:10
}
const allTypes = [
   "WEB",
   "IMAGE",
   "VIDEO",
   "NEWS",
   "DISCOVER",
   "GOOGLE_NEWS",
];

const allRowLimit = [
    10,
    25,
    100,
    250,
    1000
]; 
const AllTypes = ({disabled,handelChange}) =>(
    <div className='w-52'>
        <h5  className='my-2'>Select web propert</h5>
        <select disabled={disabled} className={`${disabled && "cursor-not-allowed"}  w-full h-10 px-2 rounded   outline outline-1`} onChange={handelChange} defaultValue={1} name="type">
            ${
                allTypes.map((elem,index)=>(
                    <option key={index} value={elem} >
                        {elem.toLocaleLowerCase()}
                    </option>  
                ))
            }
        </select>
    </div>
);
const AllRowLimit = ({disabled,handelChange}) =>(                       
    <div className='w-52'>
        <h5  className='my-2 '>Select web propert</h5>
        <select disabled={disabled} className={`${disabled && "cursor-not-allowed"} w-full h-10 px-2 rounded   outline outline-1`} onChange={handelChange} defaultValue={1} name="rowLimit">
            ${
                allRowLimit.map((elem,index)=>(
                    <option key={index} value={elem} >
                        {elem}
                    </option>  
                ))
            }
        </select>
    </div>

);
const GroupCompareContainer = (p) => {
    const [compareInfo,setCompareInfo] = useState(inatailState);
    const [compareInfo2,setCompareInfo2] = useState(inatailState2);
    const [compareResult,setCompareResult] = useState([]); 
    const [compareResult2,setCompareResult2] = useState([]);
    const [sites,setSites]=useState([]);
    const [open,setOpen]=useState(false);
    const compareHandler = async() => {
        try {
            const res = await api.post('/compare',compareInfo,{withCredentials:true })
            const res2 = await api.post('/compare',compareInfo2,{withCredentials:true })
            console.log(res?.data,res2?.data);
            if (res?.data&&res2?.data) {
                console.log('yep');
                setCompareResult(res?.data.rows);
                setCompareResult2(res2?.data.rows)
               
            }
        } catch (error) {
            console.log(error);  
        }
    }
    const handelSites = async()=>{
        const {decodedToken,decodeduser,checkedtoken,checkedauthedusertoken} =decoded()
        try {
          const res = await api.get(`/sites/${decodeduser.email}`,{withCredentials:true });  
          if (res.data.sites) {
            setSites(res.data.sites);
            setCompareInfo(prev=>({...prev,siteUrl:res.data.sites[0]?.siteUrl}));
            setCompareInfo2(prev=>({...prev,siteUrl:res.data.sites[0]?.siteUrl}));
          }        
        } catch (error) {
          console.log(error);
          // router.push('/');
        }
      };


    const handelChange = async (e)=>{       
        if (typeof e === "object" && e.hasOwnProperty('selection')) {
            const {selection,selection2 } = e
            const {startDate,endDate } = selection
            const startDate2 = selection2.startDate;
            const endDate2  = selection2.endDate;
            setCompareInfo(prev=>({...prev,startDate:format(startDate,'yyyy-MM-dd')}));
            setCompareInfo(prev=>({...prev,endDate:format(endDate,'yyyy-MM-dd')}));
            setCompareInfo2(prev=>({...prev,startDate:format(startDate2,'yyyy-MM-dd')}));  
            setCompareInfo2(prev=>({...prev,endDate:format(endDate2,'yyyy-MM-dd')}));  
        } else {
            const {value,name} = e?.target;
            setCompareInfo(prev=>({...prev,[name]:value}));
            setCompareInfo2(prev=>({...prev,[name]:value}));  
        }
       
    }
    useEffect(()=>{
        handelSites();
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    const disabled = sites.length ? false : true ;
   
  return (
    <div className='mt-20 ml-20 '>
        <div className='max-w-4xl  p-5 mx-auto  border border-gray-200 rounded shadow'>
            {disabled   ? <h5 className='my-2'> there is no web property</h5> :<h5  className='my-2'>Select web propert</h5>}
            <select disabled={disabled} value={compareInfo.siteUrl ? compareInfo.siteUrl :""}   className={`${disabled && "cursor-not-allowed"} w-full h-10 px-2 rounded  outline outline-1`} onChange={handelChange}  name="siteUrl">
                ${
                    sites.map((elem,index)=>(
                        <option key={index} value={elem.siteUrl} >
                            {elem.siteUrl}
                        </option>  
                    ))
                }
            </select>
            <div className='mt-3 flex justify-around items-center flex-wrap '>             
                <AllTypes disabled={disabled} handelChange={handelChange} />
                <AllRowLimit  disabled={disabled} handelChange={handelChange}  />
                <div className='w-52 relative z-20 cursor-pointer ' >
                    <div className='my-12  ' />
                    <div className='w-full h-10  flex justify-between p-2 mb-2 items-center rounded  outline outline-1'  onClick={() => setOpen(!open)}>
                        <h4 className='text-sm'>Pick Two Dates To Compare</h4>
                        <HiOutlineChevronDown
                            size={26}
                            className={ `${open && "rotate-180"}`}
                           
                        />
                    </div>
                    {open && <div className=' absolute duration-500'> <Calender handelChange={handelChange}   /></div>}
                </div>
            </div>
           
            <button 
                className={`mt-4 ${disabled && "cursor-not-allowed"} dark:bg-gray-800 dark:border-gray-700 text-white text-sm py-2 px-4 mx-2`}
                disabled={disabled} onClick={compareHandler}
            >
                compare
            </button>

           
        </div>
        <CompareTable  compareResult={compareResult} compareResult2={compareResult2}   />
    </div>
  )
}

export default GroupCompareContainer
