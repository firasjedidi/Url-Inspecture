import React from 'react'
import api from '@/utils/api'
const Search = ({info,setinfo,sites,disabled}) => {
  const [err,setErr] = React.useState('')
  const handelChange = async (e)=>{
    setErr("");
    const {value,name} = e.target
    setinfo(prev=>({...prev,[name]:value}))
  }
  const handelUrls = async ()=>{
    try {
      const res = await api.post("/url",info,{withCredentials:true }) 
      console.log(res.data,'ee');
    } catch (error) {
      console.log(error?.response?.data[0]?.message);
      setErr( error?.response?.data[0]?.message ) 
    }  
  }
  return (
    <div className='w-full  mt-10 border border-gray-200 rounded shadow '>
        <div className=' p-5  '>
          {disabled   ? <h5 className='my-2'> there is no web property</h5> :<h5  className='my-2'>Select web propert</h5>}
          <select disabled={disabled} className='w-full h-10 px-2 rounded  outline outline-1' onChange={handelChange} defaultValue={1} name="siteUrl">
            ${sites.map((elem,index)=>(
                <option key={index} value={elem.siteUrl} >{elem.siteUrl}</option>  
              ))
            }
          </select>
          <input className='mt-4 px-1 w-full h-10 flex flex-grow flex-shrink rounded outline outline-1' onChange={handelChange} placeholder="inspection Url" type={"text"} name="inspect" />
          <button disabled={disabled}  className='mt-4 dark:bg-gray-800 dark:border-gray-700 text-white py-2 px-4 mx-2  ' onClick={handelUrls}>check</button>
          <p className='text-red-700 mt-2'>{err !='' ? err : "" }</p>
        </div>
       
    </div>
  )
}

export default Search