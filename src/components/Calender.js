import React ,{useState,useCallback} from 'react'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
const Calender = ({handelChange}) => {
    const date = new Date()
    const [state, setState] = useState({
        selection: {
          startDate: new Date(`${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()-5}`),
          endDate: new Date(`${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()-5}`),
          key: 'selection',
        },
        selection2: {
          startDate: new Date(`${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()-4}`),
          endDate:new Date(`${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()-4}`),
          key: 'selection2'
        }}
    );
    const maxDate = new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-4}`)
    const handelSelecte = (item) =>{
      setState({ ...state, ...item })
      handelChange(state)
    }
   
  return (
    <DateRange 
        onChange={handelSelecte}
        ranges={[state.selection, state.selection2]}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        preventSnapRefocus={true}
        direction="horizontal"  
        maxDate={maxDate}
        ariaLabels={{
            dateInput: {
              selection1: { startDate: "start date input of selction 1", endDate: "end date input of selction 1" },
              selection2: { startDate: "start date input of selction 2", endDate: "end date input of selction 2" }
            },
            monthPicker: "month picker",
            yearPicker: "year picker",
            prevButton: "previous month button",
            nextButton: "next month button",
        }}
        
    />
  )
}

export default Calender