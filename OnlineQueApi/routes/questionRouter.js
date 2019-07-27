const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionsController');

router.post('/addQuestions',questionController.addQuestion);
router.delete('/deleteQuestion/:id',questionController.deleteQuestion);
router.get('/findQuestions?:id',questionController.findQuestions);
router.get('/QuestionById?:id',questionController.QuestionById);
router.put('/updateQuestion?:id',questionController.updateQuestion);
router.get('/questionUsingSubjectId?:subjectId',questionController.questionUsingSubjectId);
router.get('/getQuestion',questionController.getQuestion);
router.post('/getQueAsperTags',questionController.getQueAsperTags);
module.exports = router;