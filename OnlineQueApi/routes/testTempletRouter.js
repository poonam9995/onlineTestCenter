const express = require('express');
const router = express.Router();
const testTemplet = require('../controllers/testTempletController');
router.post('/addTestTemplet',testTemplet.addTestTemplet);
router.get('/findTestTemplet?:id',testTemplet.findTestTemplet);
router.delete('/deleteTestTemplet/:id',testTemplet.deleteTestTemplet);
router.put('/updateTestTemplet?:id',testTemplet.updateTestTemplet);
router.post('/CheckUniqueTest',testTemplet.CheckUniqueTest)
module.exports= router;