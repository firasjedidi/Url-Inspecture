const router = require('express').Router();
const {sites,clicks,urlsInspection,urlInspecter,groupCompare,check} = require('../controllers/retrive');
router.get('/sites/:id',sites);
router.get('/clicks/:id',clicks);
router.get('/urls/:id',urlsInspection);
router.post('/url',urlInspecter);
router.post('/compare',groupCompare);
router.get('/check/:id',check)
module.exports = router;