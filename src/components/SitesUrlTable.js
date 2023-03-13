import React from 'react'
import { useRouter } from 'next/router'
import { HiOutlineExternalLink} from "react-icons/hi2";
const SitesUrlTable = ({sites}) => {
    const router = useRouter();
    const navigate = (id,check)=>{
        if (check) {
            router.push({pathname:'/details',query:{id,check:true}},'/details') ;  
        }else router.push({pathname:'/details',query:{id}},'/details');
    }
  return (
    <div className="flex flex-col mt-5 mx-3">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full">
                        <thead className="border bg-slate-100">
                            <tr>
                                <th scope="col" className="text-sm font-medium border-r px-1  md:px-6 py-4  text-center ">
                                    #
                                </th>
                                <th scope="col" className="text-sm font-medium border-r px-1  md:px-6 py-4 text-left">
                                    Site Url
                                </th>
                                <th scope="col" className="text-sm font-medium border-r  text-center px-6 py-4 ">
                                    Action
                                </th>                     
                            </tr>
                        </thead>
                        <tbody>
                            {sites.map((elem,index)=>(
                                <tr key={index} className=" border even:bg-slate-100  ">
                                    <td className="px-6 py-4 whitespace-nowrap  text-center  text-sm font-medium border-r ">{index}</td>
                                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">
                                        {elem.siteUrl}
                                    </td>
                                    <td  className="flex flex-wrap items-center justify-center space-x-3  font-light px-6 py-4  whitespace-nowra">
                                        <button className='text-base dark:bg-gray-800 dark:border-gray-700 cursor-pointer text-white py-1 px-4 m-1  ' onClick={(e)=>navigate(elem.id)} >View</button>
                                        <button className='text-base dark:bg-gray-800 dark:border-gray-700 cursor-pointer text-white py-1 px-4 ' onClick={(e)=>navigate(elem.id,true)} >Create</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SitesUrlTable