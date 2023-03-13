const { google } = require('googleapis');
const searchconsole = google.searchconsole('v1');
const {handelApiError} = require('../global/handelError');
const {format} = require('date-fns')
const sitesList = async (req) =>{
  try{
    const {data} = await searchconsole.sites.list({})
    return data;
  }catch (error) {
    if (error) {
      const res = handelApiError(error,req);
      if (res == "succsse") {
        const data2 = await sitesList(req);
        return data2;
      }else return error?.errors; 
    }
  }
}
const clicksApi = async(siteUrl,req)=>{
    const date = new Date();
    const maxDate = new Date(`${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()-4}`)
    const minDate = new Date().setMonth(`${date.getMonth()+1-12}`)
    const endDate = format(maxDate,'yyyy-MM-dd')
    const startDate = format(minDate,'yyyy-MM-dd')
    try {
      const {data} = await searchconsole.searchanalytics.query({
        siteUrl:siteUrl,
        requestBody: {
          "endDate": endDate,
          "startDate":startDate,
          "dimensions": [
            "PAGE",
          ],
          "dimensionFilterGroups": [
            {
              "filters": [
                {
                  "dimension": "DEVICE",
                  "operator": "NOT_CONTAINS",
                  "expression": "tablet"
                }
              ]
            }
          ],
        },
      });
      return data;
    } catch (error) {
      if (error) {
        const res = handelApiError(error,req);
        if (res == "succsse") {
          const data2 = await clicksApi(siteUrl,req);
          return data2;
        }else return error?.errors;        
      }
    }
  }
  const urlInspecterApi = async(siteUrl,inspect,req)=>{
    try {
      const {data} = await searchconsole.urlInspection.index.inspect({
        "inspectionUrl": siteUrl+inspect,
        "languageCode": "en-US",
        "siteUrl": siteUrl, 
      })
     return data
    } catch (error) {
      if (error) {
        const resl = handelApiError(error,req);
        if (resl == "succsse") {
          const data2 = await urlInspecterApi(siteUrl,inspect,req);
          return data2;
        } else return error?.errors;      
      }
    }
  }
const  groupCompareApi = async(info,req) =>{
  try {   
    const {data} = await searchconsole.searchanalytics.query({
      siteUrl:info.siteUrl,
      requestBody: {
        "endDate": info.endDate,
        "startDate":info.startDate,
        "type": info.type,
        "dimensions":info.dimensions,
        "dimensionFilterGroups": [
          {
            "filters": [
              {
                "dimension": "DEVICE",
                "operator": "NOT_CONTAINS",
                "expression": "tablet"
              }
            ]
          }
        ],
        "rowLimit":parseInt(info.rowLimit),
      },
    });
    return data;
  } catch (error) { 
    if (error) {
      const resl = handelApiError(error,req);
      if (resl == "succsse") {
        const data2 = await groupCompareApi(info,req);
        return data2;
      }else return error?.errors; 
    }
  }
}




module.exports ={
  sitesList,
  clicksApi,
  urlInspecterApi,
  groupCompareApi
}