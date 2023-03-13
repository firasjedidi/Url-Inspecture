const router = require('express').Router();
const {loginGoogle,redirect ,loginUser,signup,logout} = require('../controllers/auth');
router.get('/redirect',redirect);
router.get('/oauth2callback',loginGoogle);
router.post('/login',loginUser);
router.post('/signup',signup);
router.get('/logout',logout)
module.exports=router;