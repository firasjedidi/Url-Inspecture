const url = require('url');
const { google } = require('googleapis');
const q = require('../q.json');
const oauth2 = google.oauth2('v2');
const {generateJWT} = require('../global/jwt');
const bcrypt = require('bcrypt');
const {findAllUsersDb,userInsertation}= require('../DB/dbFunc');
const maxAge= 3*24*60*60;
const scopes = [ 
    'openid',
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/webmasters",
    "https://www.googleapis.com/auth/webmasters.readonly",
    
]
const oauth2Client = new google.auth.OAuth2(
    q.web.client_id,
    q.web.client_secret,
    q.web.redirect_uris[0],
);
  
const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes.join(' '),
    prompt:'consent',
    include_granted_scopes: true,
});
  
const redirect  = (req,res)=>{
    res.redirect(301, authorizeUrl );
    res.end('');
};

const loginGoogle = async (req,res) =>{  
    let q = url.parse(req.url, true).query;
  if (q.error) { 
    console.log('Error:' + q.error);
  } else {
        try {
            let { tokens } = await oauth2Client.getToken(q.code);
            if( req.cookies.tokens?.refresh_token !== undefined){
                console.log("yo",tokens);
                if (tokens.refresh_token) {
                    oauth2Client.setCredentials(tokens);
                    res.cookie('tokens', tokens, { maxAge: maxAge });
                }else {
                    oauth2Client.setCredentials( req.cookies.tokens);
                }  
            }else{
                console.log("yoo");
                if (tokens.refresh_token) {
                    oauth2Client.setCredentials(tokens);
                    res.cookie('tokens', tokens, { maxAge: maxAge });
                }else 
                oauth2Client.setCredentials(tokens);
                res.cookie('tokens', tokens, { maxAge: maxAge });
            }
            google.options({auth: oauth2Client});
            const {data} = await oauth2.userinfo.get({})
            res.cookie('user', data, { maxAge: maxAge });
            res.redirect(301,`http://localhost:3000/home?id=${data.email}`);  
        } catch (error) {
            console.log(error);
            res.redirect(301,`http://localhost:3000/`) ; 
            res.end('')
        }
    }
   res.end()
}
const signup = async(req,res)=>{
    const {email,password}=req.body
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt)
    try {
        const checkUsers = await findAllUsersDb(email);
        const data = JSON.parse(JSON.stringify(checkUsers))
        if (data.length > 0) {
            res.status(409).send({msg: "This email is already in use!",})
        }else{
            try {
                const insertedUser = await userInsertation({email,password:hashedpassword});
                const user = JSON.parse(JSON.stringify(insertedUser));
                if (user) {
                    res.status(201).send({msg: "The user registerd !",res:user});
                }
            } catch (error) {
                res.status(409).send({msg:error}) 
            }
        }
    } catch (error) {
      res.status(409).send({msg:error})  
    }
} 

const loginUser = async(req,res) =>{
    const {email,password}=req.body;
    try {
        const checkUsers = await findAllUsersDb(email);
        const data = JSON.parse(JSON.stringify(checkUsers));
        if (data.length > 0) {
            const user = await bcrypt.compare(password,data[0]["password"]);
            delete data[0]["password"];
            const token = generateJWT(data[0]);
            const refreshtoken = generateJWT({ exp: maxAge, data: data[0]["id"] });
            const obj ={token:token,refreshtoken:refreshtoken};
            if(user){
                res.cookie('authedUser', obj, { maxAge: maxAge });
                res.status(201).send({msg: "The user is authed",res:{token:token,refreshtoken:refreshtoken}});
            }
        }else{
            res.status(409).send({msg: "create account"});
        }
    } catch (error) {
        console.log(error);
      res.status(409).send({msg:error});  
    }
}
const logout = (req,res)=>{
    res.clearCookie("user")
    .clearCookie("tokens")
    .clearCookie("authedUser")
    .send("done")
}
module.exports = {
    redirect,
    loginGoogle,
    oauth2Client,
    loginUser,
    signup,
    logout
}
