const router = require('express').Router();
const {connect,cliksCreate} = require('../controllers/write');
router.post('/connect',connect);
router.post('/clicks',cliksCreate)
module.exports = router;