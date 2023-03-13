const {users,ssc,su,sequelize} = require('./connect')
// all the selectes form database
const findAllSitesDb = async(email)=>{
    try {
        const res = await ssc.findAll({where:{mail_sc:email.replace(/\n/g, '')}});
        return res;
    } catch (error) {
        return error;
    }
}
const findAllUrlSitesDb = async(id)=>{
    try {
        const res = await su.findAll({where:{site_id:id}});
        return res;
    } catch (error) {
        return error;
    }
}
const findOneSiteDb = async(id)=>{
    try {
        const res = await ssc.findAll({where:{id:id}});
        return res;
    } catch (error) {
        return error;
    }
}
const findOneUrlSiteDb = async(id)=>{
    try {
        const res = await su.findAll({where:{id:id}});
        return res;
    } catch (error) {
        return error;
    }
}
const findOneUserDb = async(email)=>{
    try {
        const res = await users.findAll({where:{email:email.replace(/\n/g, '')}});
        return res;
    } catch (error) {
        return error;
    }
}
const findAllUsersDb = async(email)=>{
    try {
        const res = await users.findAll({where:{email:email.replace(/\n/g, '')}});
        return res;
    } catch (error) {
        return error;
    }
}
// all the insertion for the database
const sitesInsertion = async(sites) =>{
    try {
        const res = await ssc.bulkCreate(sites);
        return res;
    } catch (error) {
        return error;
    }   
}
const sitUrlsInsertation = async(sitUrls) =>{ 
    try {
        const res = await su.bulkCreate(sitUrls);
        return res;
    } catch (error) {
        return error;
    }
}
const userInsertation = async(user) =>{
    try {
        const res =await users.create(user);
        return res;
    } catch (error) {
        return error;
    }
}
// all the updates for the database
const updatesitUrls = async (sites,id) =>{
    console.log(sites,id);
    try {
        // sequelize.query()
        const res = await su.update(sites,{where:{id:id}});
        console.log(res,'updatesitUrls res');
        return res;
    } catch (error) {
        console.log(error,"updatesitUrls");
    }
}
// all the deletes for the database
module.exports ={
    findAllSitesDb,
    findAllUrlSitesDb,
    findAllUsersDb,
    findOneUrlSiteDb,
    findOneUserDb,
    findOneSiteDb,
    sitesInsertion,
    sitUrlsInsertation,
    userInsertation,
    updatesitUrls, 
}