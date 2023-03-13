import React from 'react'
import {  utils, writeFileXLSX } from 'xlsx';
import {customStyles,theadCompare} from '@/utils/table'

import DataTable from 'react-data-table-component';
const CompareTable = ({compareResult,compareResult2}) => {
  const [pending, setPending] = React.useState(true);
	const [rows, setRows] = React.useState([]);
  
	React.useEffect(() => {
		const timeout = setTimeout(() => {
      let arr =[]
      if (compareResult.length >0 ) {
        compareResult.forEach((old,index)=>{
          arr = [...arr,{"#":index,"key":old.keys[0], "ClicksFirstPeriod":old.clicks,
          "ClicksSecondPeriod":compareResult2[index]?.clicks || 0, "ClicksDiffrence":compareResult2[index]?.clicks || 0 - old.clicks,
          "ImpressionsFirstPeriod":old.impressions ,"ImpressionsSecondPeriod":compareResult2[index]?.impressions || 0 ,
          "ImpressionsDiffrence":compareResult2[index]?.impressions || 0 - old.impressions ,
          "Changes":old.ctr || 0,
          "PositionFirstPeriod":old.position ,
          "PositionSecondPeriod":compareResult2[index]?.position || 0,
          "PositionDiffrence":compareResult2[index]?.position || 0 - old.position,
          }]
        })
        setRows(arr)
      }
      
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, [compareResult]);// eslint-disable-line react-hooks/exhaustive-deps
  const exportFile =  React.useCallback(() => {
    const ws = utils.json_to_sheet(rows);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "SheetJSReactAoO.xlsx");
  }, [rows]);
  console.log(rows);
  const disabled = rows.length > 0  ? false : true ;
  const actionsMemo =<button disabled={disabled} onClick={exportFile}   className={` ${disabled && "cursor-not-allowed"} dark:bg-gray-800 dark:border-gray-700 text-white text-sm py-2 px-4 mx-2`}> Export To cvs</button>
  return (
    <div className='z-10 mt-4'>
      <DataTable title="Compare Result" striped={true} 
        responsive={true} actions={actionsMemo} customStyles={customStyles} 
        noDataComponent=" there are no records to display"  columns={theadCompare}
        data={rows} progressPending={pending} pagination={true}  
      /> 
    </div>
  )
}

export default CompareTable
// const thead= [
//   "#",
//   "key",
//   "Clicks First Period",
//   "Clicks Second Period",
//   "Clicks Diffrence ",
//   "Impressions First Period",
//   "Impressions Second Period",
//   "Impressions Diffrence ",
//   "changes",
//   "Position First Period",
//   "Position Second Period",
//   "Position Diffrence ",

// ]
 {/* <div className="overflow-scroll sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table ref={tbl}  id='compre-table'  className="min-w-full">
                  <thead  className="border bg-white/80">
                    <tr>
                    {thead.map((header,index)=>(
                        <th key={index} scope="col" className="text-sm font-medium text-gray-900  px-6 py-4 text-left border">
                          {header}
                        </th>
                    ))}      
                    </tr>
                  </thead>
                  <tbody> 
                    {compareResult.map((old,index)=>(
                      <tr key={index} className=" border text-center ">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">{index}</td>
                        <td className="text-smfont-light text-left px-6 py-4 whitespace-nowrap border">
                          {old.keys}
                        </td>
                        <td className="text-smfont-light px-6 py-4 whitespace-nowrap border">
                            {old.clicks}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap border">
                            {compareResult2[index]?.clicks || 0}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap border">
                            {compareResult2[index]?.clicks || 0 - old.clicks}
                        </td>
                        <td className="text-smfont-light px-6 py-4 whitespace-nowrap border">
                            {old.impressions}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap border">
                            {compareResult2[index]?.impressions || 0}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap border">
                            {compareResult2[index]?.impressions || 0 - old.impressions}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap border">
                            {compareResult2[index]?.ctr || 0}
                        </td>
                        <td className="text-smfont-light px-6 py-4 whitespace-nowrap border">
                            {old.position }
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap border">
                            {compareResult2[index]?.position|| 0 }
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                            {compareResult2[index]?.position || 0  - old.position }
                        </td>
                      </tr>
                    ))}
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}