import { decode, verify } from "jsonwebtoken";

export function decoded() {
    const user =  document.cookie &&  decodeURIComponent( document.cookie ).split(';')[0] && JSON.parse(decodeURIComponent( document.cookie ).split(';')[0].split(':').slice(1).join(':'));
    const token = document.cookie && decodeURIComponent( document.cookie ).split(';')[1] &&  JSON.parse(decodeURIComponent( document.cookie ).split(';')[1].split(':').slice(1).join(':'));
    const autheduser = document.cookie && decodeURIComponent( document.cookie ).split(';')[2] && JSON.parse(decodeURIComponent( document.cookie ).split(';')[2].split(':').slice(1).join(':'));
    const decodedToken =  user !== undefined && user?.hasOwnProperty( "access_token") ? user : token?.hasOwnProperty( "access_token") ? token :autheduser;
    const decodeduser =   user !== undefined  && user?.hasOwnProperty('email') ? user : token?.hasOwnProperty( "email") ? token :autheduser;
    const decodedautheduser=  user !== undefined && user.hasOwnProperty('refreshtoken') ? user : token.hasOwnProperty( "refreshtoken") ? token : autheduser;
    const checkedtoken = decodedToken?.refresh_token ? "refresh_token": "access_token";
    const checkedauthedusertoken = decodedautheduser ? true: false;
    console.log(checkedauthedusertoken,decodedautheduser);
    // after encoded of in the B-E use decode method to use the data;
    // console.log(decode(decodedautheduser?.token)); 
   
    return{
        decodedToken,decodeduser,
        checkedtoken,checkedauthedusertoken
    }
}