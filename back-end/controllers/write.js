const {findAllSitesDb,findAllUrlSitesDb,findOneSiteDb,sitesInsertion,sitUrlsInsertation}= require('../DB/dbFunc')
const {sitesList,clicksApi} = require('../global/apis');
const siteInsertion = async(array,email)=>{
    const date = new Date()
    const arr = []
    for (let index = 0; index < array.length; index++) {
        arr.push({siteUrl:array[index].siteUrl,date_inspected:date,mail_sc:email})
    }
    try {
        const sites =await sitesInsertion(arr);
        const data = JSON.parse(JSON.stringify(sites))
        if (data.length > 0) {
          return "succsses";   
        } 
        
    } catch (error) {
        return error;
    }
}
const checkSites = async(data,user) =>{
    const check = data.siteEntry.filter((elem)=>{
        let foundElement =  user.find(element => element.siteUrl === elem.siteUrl);
        return foundElement === undefined;
    })
    if (check.length > 0) {
        const result = await  siteInsertion(check,email);
        if (result ==="succsses") {
            return "succsses"; 
        } else {
            return error;
        }
      } 
    
}
const connect = async(req,res)=>{
    const  data = req.body
    const email = data.email || req.cookies.user.email
    try {
        const data = await sitesList(req);
        const userDb = await findAllSitesDb(email);
        const user = JSON.parse(JSON.stringify(userDb));
        if (user.length > 0) {
            if ( data?.siteEntry?.length > 0   && data.siteEntry != "undefined") {                    
                if (user.length !==  data.siteEntry.length) {
                    const check = await checkSites(data,user)
                    if (check === "succsses") {
                      res.send({email:email||req?.cookis?.user.email})
                    } else {
                     res.status(400).send("mysql err");  
                    }  
                } else {    
                    res.send({email:email});                 
                }        
            }            
        }else{
            if ( data?.siteEntry?.length > 0   && data.siteEntry != "undefined" ) {
                if (email != "undefined" || req.cookis.user.hasOwnProperty("email")) {
                    const result = await siteInsertion(data.siteEntry,email ||req.cookis.user.email);
                    if (result === "succsses") {
                        res.send({email:email||req.cookis.user.email})
                    } else {
                        res.status(400).send("mysql err");  
                    }
                } else {
                    res.redirect(301,`http://localhost:3000`)  
                }
               
            } else{
                res.redirect(301,`http://localhost:3000/404`) 
            }
        }
    } catch (error) {
        res.status(400).send("mysql err");  
    }

}

// insertion to site_url splited to 3 parts
const sitUrlInsertation = async (array,site_id) =>{
    const date = new Date()
    const arr = []
    for (let index = 0; index < array.length; index++) {
        arr.push({
            site_id,date_inspected:date,clicks:array[index].clicks,
            impressions:array[index].impressions, position:array[index].position,
            siteUrl:array[index].keys[0],ctr:array[index].ctr,
        }); 
    }
    try {
        const sites =await sitUrlsInsertation(arr);
        const data = JSON.parse(JSON.stringify(sites))
        if (data.length > 0) {
          return data;   
        } 
        
    } catch (error) {
        return error;
    }
}



const checkSitesUrls = async(apiData,sites,site_id) =>{
    const check = apiData.rows.filter((elem)=>{
        let foundElement =  sites.find(element => element.siteUrl === elem.keys[0]);
        return foundElement === undefined;
      })
      if(check.length>0){
        const result = await  sitUrlInsertation(check,site_id);
        console.log(result,"isert");
        if (result?.length > 0 && result != "undefined") {
           return  result;
        } else {
            return  result;
        }
    }
}
const cliksCreate = async(req,res) =>{
    const {id} = req.body
    try {
        const cheksitebyid = await findOneSiteDb(id);
        const site = JSON.parse(JSON.stringify(cheksitebyid));
        if (site.length > 0) {
          const siteUrl = site[0]['siteUrl'];
          try {
            const apiData = await clicksApi(siteUrl,req);
            const cheksitesbyid = await findAllUrlSitesDb(id)
            const sites = JSON.parse(JSON.stringify(cheksitesbyid)); 
            if (sites.length > 0) {
                if(apiData?.rows?.length > 0 && apiData?.rows != "undefined"){
                    if(sites.length !== apiData.rows?.length){
                        const result = await checkSitesUrls(apiData,sites,id)
                        if (result === "succsses") {
                            res.send({clicks:result})
                        } else {
                            res.status(400).send("mysql err");  
                        }
                    }else{
                      res.send({clicks:sites})
                    }
                }
            }else {
                if(apiData?.rows?.length > 0 && apiData.rows != "undefined"){
                    const result = sitUrlInsertation(apiData.rows,id);
                    if (result?.length > 0 && result != "undefined") {
                      res.send({clicks:result})
                    } else {
                      res.status(400).send(result);
                    }
                }else{
                    res.status(400).send("no available urls");
                }
            }
          } catch (error) {
            res.status(400).send("mysql select error in su");
          }
        }else  res.status(400).send("no sites where found in your acount");
    } catch (error) {
        res.status(400).send("mysql select error in ssc");
    }
    
     
}



module.exports = {
    connect,
    cliksCreate
}