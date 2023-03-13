const {oauth2Client} = require('../controllers/auth');
const { google } = require('googleapis');
const https = require('https');
const handelApiError = (err,req)=>{
 if (err?.response?.data?.error.status ===  "UNAUTHENTICATED") {
    if (req.cookies.tokens.hasOwnProperty("refresh_token")) {
      try {
        oauth2Client.setCredentials({refresh_token: req?.cookies.tokens?.refresh_token});
        google.options({auth: oauth2Client});
        return "succsse"
      } catch (error) {
        return error;
      }
    } else {
      console.log("somthing wrong with api ",err);
      console.log(req.cookies?.tokens.access_token);
        let postData = "token=" + req.cookies?.tokens.access_token;
        let postOptions = {
          host: 'oauth2.googleapis.com',
          port: '443',
          path: '/revoke',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        };
      
        const postReq = https.request(postOptions, function (res) {
          res.setEncoding('utf8');
          res.on('data', d => {
            console.log('Response: ' + d);
          });
        });
      
        postReq.on('error', error => {
          console.log(error,"error handel revoke")
        });
        
        postReq.write(postData);
        postReq.end();
    }
   
 }

}
module.exports ={
    handelApiError
}