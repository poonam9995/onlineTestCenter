const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
router.post('/addTopic',topicController.addTopic);
router.delete('/removeTopic/:id',topicController.removeTopic);
router.get('/findTopic',topicController.findTopic);
router.put('/updataTopic?:id',topicController.updataTopic);
router.get('/findTopic?:subjectId',topicController.findTopic)
module.exports= router;