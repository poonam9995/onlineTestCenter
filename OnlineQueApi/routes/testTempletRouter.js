const express = require('express');
const router = express.Router();
const testTemplet = require('../controllers/testTempletController');
router.post('/addTestTemplet',testTemplet.addTestTemplet);
router.get('/findTestTemplet',testTemplet.findTestTemplet);
router.delete('/deleteTestTemplet/:id',testTemplet.deleteTestTemplet);
router.put('/updateTestTemplet/:id',testTemplet.updateTestTemplet);
module.exports= router;