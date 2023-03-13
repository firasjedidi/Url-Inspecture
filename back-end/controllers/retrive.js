const { google } = require('googleapis');
const searchconsole = google.searchconsole('v1');
const {handelApiError} = require('../global/handelError');
const {clicksApi,groupCompareApi,urlInspecterApi} = require('../global/apis');
const {findAllSitesDb,findAllUrlSitesDb,findOneSiteDb,updatesitUrls}= require('../DB/dbFunc')
const {format, parseISO} = require('date-fns')
const sites = async (req,res) =>{
  const {id} = req.params
  const email = id || req.cookies.user.email
  console.log(email,"//");
  try {
    const sites = await findAllSitesDb(email);
    const data = JSON.parse(JSON.stringify(sites));
    if (data.length > 0) {
      res.send({sites:data})
    }else{
      res.status(400).send("no avialable websites")
    }
  } 
  catch (error) {
    res.status(400).send("mysql select err");
  }
}

const clicks = async(req,res)=>{
  const {id} = req.params
  try {
    const sites = await findAllUrlSitesDb(id);
    const clicks = JSON.parse(JSON.stringify(sites));
    if (sites.length > 0) {
      res.send({clicks:clicks});
    } else {
      res.status(400).send("no available urls");
    }
      
  } catch (error) {
    res.status(400).send("mysql select err");
  }

};
const indexedUpdated =async (indexedSites,id)=>{
  const date = new Date();
  const update= { 
    verdict:indexedSites.inspectionResult.indexStatusResult.verdict,
    coverageState:indexedSites.inspectionResult.indexStatusResult.coverageState,
    robotsTxtState:indexedSites.inspectionResult.indexStatusResult.robotsTxtState ,
    indexingState:indexedSites.inspectionResult.indexStatusResult.indexingState ,
    pageFetchState:indexedSites.inspectionResult.indexStatusResult.pageFetchState ,
    crawledAs:indexedSites.inspectionResult.indexStatusResult.crawledAs ,
    mobileUsabilityResult:indexedSites.inspectionResult?.mobileUsabilityResult?.verdict,
    lastCrawlTime:indexedSites.inspectionResult.indexStatusResult.lastCrawlTime,
    date_inspected:date,
  }
  try {
    const updated = await updatesitUrls(update,id);
    const data = JSON.parse(JSON.stringify(updated));
    console.log( Object.values(data),'up');
    return data;
   
  } catch (error) {
    console.log(error,"update ret");
  }
}

const indexedApi = async(site,siteUrl,req)=>{
  const midp = Math.floor(site.length/2);
  const left = site.slice(0,midp);
  const rigth = site.slice(midp);
  let arr= []
  for (let index = 0; index < left.length; index++) {
    try {
      const {data}= await searchconsole.urlInspection.index.inspect({
        "inspectionUrl": left[index].siteUrl,
        "languageCode": "en-US",
        "siteUrl": siteUrl, 
      })
      if (data) {
        const res=await indexedUpdated(data,left[index].id);
        arr.push(res)
        if(arr.length === left.length) return "success";
        else console.log("nop");
      }
    } catch (error) {
      if (error) {
        const resl = handelApiError(error,req);
        console.log(error?.response,'res indexedApi');
        if (resl == "succsse") {
          const data2 = await indexedApi(site,siteUrl,req);
          return data2;
        }else  return error;  
      }
    }
  
  }
 
 // searchconsole.urlInspection.index.inspect({
    //   "inspectionUrl": left[index].siteUrl,
    //   "languageCode": "en-US",
    //   "siteUrl": siteUrl, 
    // }).then(async indexedSites =>{
    //   if (indexedSites) {
    //     const res=await indexedUpdated(indexedSites.data,left[index].id)
    //     arr.push(res)
    //     if(arr.length === left.length) return "success";
    //     else console.log("nop");
    //   }
    //  }).catch(async error=>{
    //   if (error) {
    //     const resl = handelApiError(error,req);
    //     console.log(error?.response,'res indexedApi');
    //     if (resl == "succsse") {
    //       const data2 = await indexedApi(site,siteUrl,req);
    //       return data2;
    //     }
    //   }
    // }) 

};

const urlsInspection = async(req,res) =>{
  const {id} = req.params;
  try {
    const cheksitebyid = await findOneSiteDb(id)
    const site = JSON.parse(JSON.stringify(cheksitebyid));
    if (site.length > 0) {
      const siteUrl = site[0]['siteUrl'];
      try {
        const cheksitesbyid = await findAllUrlSitesDb(id)
        const sites = JSON.parse(JSON.stringify(cheksitesbyid)); 
        if (sites.length > 0) {
          const result = await indexedApi(sites,siteUrl,req);
          if(result === "success"){
            try {
              const finalresult = await findAllUrlSitesDb(id)
              const indexed = JSON.parse(JSON.stringify(finalresult));
              console.log("eeee");
              res.send({clicks:indexed})
            } catch (error) {
              res.status(400).send("mysql select error in su");
            }
          }
        } else   res.status(400).send("no indexed sites where found in your acount");
      } catch (error) {
        console.log(error);
        res.status(400).send("mysql select error in su");
      }
    }else  res.status(400).send("no sites where found in your acount");
  } catch (error) {
    res.status(400).send("mysql select error in ssc");
  }
}

const check = async(req,res) => {
  const {id} = req.params;
  try {
    const cheksitebyid = await findOneSiteDb(id)
    const site = JSON.parse(JSON.stringify(cheksitebyid));
    if (site.length > 0) {
      const siteUrl = site[0]['siteUrl'];
      try {
        const cheksitesbyid = await findAllUrlSitesDb(id)
        const sites = JSON.parse(JSON.stringify(cheksitesbyid)); 
        if (sites.length > 0) {
          let counter = 0;
          const date = new Date();
          const updatedAt = format(parseISO(sites[counter].date_inspected),'yyyy-MM-dd');
          const checkDate = format(date,'yyyy-MM-dd')
          function checkCounter() { 
            let timout = setTimeout(async()=>{  
              if (counter === sites.length) { 
                console.log('Counter has reached destination 1')
                clearTimeout(timout)
                res.send( "done" )
              } else { 
                console.log('Counter is still counting...'); 
                if (updatedAt != checkDate) {
                  try {
                    const {data} = await searchconsole.urlInspection.index.inspect({
                      "inspectionUrl": sites[counter].siteUrl,
                      "languageCode": "en-US",
                      "siteUrl": siteUrl, 
                    })
                    if (data) {
                      const res=await indexedUpdated(data,sites[counter].id);
                      if(res)  {
                        counter++; 
                        checkCounter(); 
                      }
                    }
                  } catch (error) {
                    if (error) {
                      const resl = handelApiError(error,req);
                      if (resl == "succsse") {
                        const data2 =  check2(site,siteUrl,req);
                        return data2;
                      }else  return error;  
                    }
                  }
                } else {
                  console.log('Counter has reached destination 2')  
                  clearTimeout(timout)
                  res.send( "done" )
                }
              } 
            }, 2000); 
          
          } 
          checkCounter();
        } else   res.status(400).send("no indexed sites where found in your acount");
      } catch (error) {
        console.log(error);
        res.status(400).send("mysql select error in su");
      }
    }else  res.status(400).send("no sites where found in your acount");
  } catch (error) {
    res.status(400).send("mysql select error in ssc");
  }

  
}
const urlInspecter = async(req,res)=>{
  const {siteUrl,inspect} = req.body
  try {
    const data = await urlInspecterApi(siteUrl,inspect,req)
    if (data.inspectionResult) {
      res.send(data) 
    }else res.status(400).send(data) 
   
  } catch (error) {
    res.status(400).send(error) 
  }
}
const  groupCompare = async(req,res) => {
  const info = req.body;
  try {
    const result = await groupCompareApi(info,req);
    console.log(result,'res');
    if (result?.rows.length > 0 && result !== "undefiend" ) {
      res.send(result)
    } 
  } catch (error) {
    res.status(400).send("no available websites");
  }
}



module.exports = {
  sites,
  clicks,
  urlsInspection,
  urlInspecter,
  groupCompare,
  check
}