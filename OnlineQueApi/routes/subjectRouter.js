const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
router.post('/addSubject',subjectController.addSubject);
router.get('/findSubject',subjectController.findSubject);
router.delete('/removeSubject/:id',subjectController.removeSubject);
module.exports= router;