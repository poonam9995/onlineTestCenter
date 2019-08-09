const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
router.get('/getTestDetails?:id',examController.getTestDetails);
module.exports= router;