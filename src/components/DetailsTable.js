import React from 'react'
import {customStyles,theadDetails} from '@/utils/table'
import DataTable from 'react-data-table-component';
const Table = ({id,clicks}) => {
    const [pending, setPending] = React.useState(true);
	const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
		const timeout = setTimeout(() => {
            let arr =[]
            if (clicks.length >0 ) {
                clicks.forEach((old,index)=>{
                arr = [...arr,Object.defineProperty(old, '#', {
                    value: index,
                    writable: false
                  })]
                })
                setRows(arr)
            }
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, [clicks]);// eslint-disable-line react-hooks/exhaustive-deps
    console.log(clicks);
  return (
    <div className="flex flex-col">
    <DataTable 
        title="indexed Result" 
        responsive={true}  columns={theadDetails} customStyles={customStyles} 
        noDataComponent=" there are no records to display" 
        data={rows} progressPending={pending}  pagination={true}  
    /> 
  </div>
  )
}

export default Table
           {/* <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full border text-center">
            <thead className="border-b">
              <tr>
                <th scope="col" className="text-sm font-medium px-6 py-4 border-r">
                  #
                </th>
                <th scope="col" className="text-sm text-left font-medium px-6 py-4 border-r">
                    siteUrl
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4 border-r">
                    clicks  
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4 border-r">
                    impressions
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4 border-r">
                    ctr
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4 border-r ">
                    position  
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4  border-r ">
                    coverage State  
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4  border-r">
                    crawledAs  
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4  border-r">
                    indexing State  
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4  border-r">
                    mobile Usability Result  
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4  border-r">
                    page Fetch State  
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4  border-r">
                    robotsTxtState  
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4  border-r">
                    verdict  
                </th>
                <th scope="col" className="text-sm font-medium px-6 py-4  border-r">
                    last Crawl Time  
                </th>
              </tr>
            </thead>
            <tbody>
               {clicks.map((elem,index)=>(
                    <tr key={index} className=" border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {index}
                        </td>
                        <td className="px-6 py-4 text-left  whitespace-nowrap text-sm font-medium  border-r">
                            {elem.siteUrl}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.clicks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.impressions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.ctr}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.coverageState ? elem.coverageState : 'null' }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.crawledAs ? elem.crawledAs : 'null' }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.indexingState   ? elem.indexingState : 'null' }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.mobileUsabilityResult  ? elem.mobileUsabilityResult : 'null' }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.pageFetchState ? elem.pageFetchState : 'null' }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.robotsTxtState ? elem.robotsTxtState : 'null' }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.verdict ? elem.verdict : 'null' }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                            {elem.lastCrawlTime ? elem.lastCrawlTime : 'null' }
                        </td>
                    </tr >
                ))}            
            </tbody>
          </table>
        </div>
      </div>
    </div> */}