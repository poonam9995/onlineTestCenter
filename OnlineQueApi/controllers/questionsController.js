const Questions = require('../models/questions');

exports.addQuestion = (req, res) => {
    console.log(req.body.correctAnswers);
 var correctAns=[];
 if(typeof req.body.correctAnswers =='string' )
 {
    correctAns.push(req.body.correctAnswers);
 }
 else{
    for(var i = 0 ; i<req.body.correctAnswers.length;i++){
correctAns.push(req.body.correctAnswers[i].id);
    }
 }
     console.log(correctAns);
    var question = new Questions({
        topicId: req.body.topicId,
        questionText: req.body.questionText,
        options: req.body.options,
        type: req.body.type,
        correctAns: correctAns,
        solution: req.body.solution,
        tags: req.body.tags
    });
    console.log(question);
    question.save((error, response) => {
        if (error) {
            res.json({
                message: 'Error',
                data: error
            });
        }
        if (response) {
            res.json({
                message: 'Success',
                data: response
            });
            console.log(response);
        }
        else {
            res.json({
                message: 'Failed'
            });

        }
    });
}
exports.deleteQuestion = (req, res) => {
    console.log(req.params.id);
    Questions.findByIdAndDelete({ _id: req.params.id }, (error, response) => {
        if (error) {
            res.json({
                message: 'Error',
                data: error
            });
        }
        if (response) {
            res.json({
                message: 'Success',
                data: response
            });
            console.log(response);
        }
        else {
            res.json({
                message: 'Failed'
            });

        }
    });
}
exports.findQuestions = (req, res) => {
   console.log("=====",req.query.id);
if(req.query.id){
    Questions.find({topicId : req.query.id}).exec().then((response) => {
      console.log(response);
        if (response) {
            res.json({
                message: 'Success',
                data: response
            });
            console.log(response);
        }
        else {
            res.json({
                message: 'Failed'
            });

        }
    });
}
else{
    Questions.find().exec().then((response) => {
        console.log(response);
          if (response) {
              res.json({
                  message: 'Success',
                  data: response
              });
              console.log(response);
          }
          else {
              res.json({
                  message: 'Failed'
              });
  
          }
      });
}
}
exports.QuestionById = (req, res)=>{
    console.log('***********');
    console.log('***********',req.query.id)
    Questions.findById({_id : req.query.id}).populate({
        path: 'topicId',
     populate: {
       path: 'subjectId',
       model: 'subject'
     } 
    }).exec().then((response) => {
        console.log(response);
          if (response) {
              res.json({
                  message: 'Success',
                  data: response
              });
              console.log(response);
          }
          else {
              res.json({
                  message: 'Failed'
              });
  
          }
      });
}
exports.questionUsingSubjectId =(req, res)=>{
    console.log(req.query.subjectId);

/**
 * Story.
  find(...).
  populate({
    path: 'fans',
    match: { age: { $gte: 21 }},
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: 'name -_id',
    options: { limit: 5 }
  }).
  exec();
 * 
 */

    Questions.find().
    populate({
        path: 'topicId',
        match:{'subjectId': req.query.subjectId},
        model:'questions'     
    }).exec().then((response) => {
        console.log(response);
          if (response) {
              res.json({
                  message: 'Success',
                  data: response
              });
              console.log(response);
          }
          else {
              res.json({
                  message: 'Failed'
              });
  
          }
      });
}
exports.updateQuestion = (req, res) => {
    // console.log( req.body);
    console.log(req.query.id);

    var question = {
        topicId: req.body.topicId,
        questionText: req.body.questionText,
        options: req.body.options,
        type: req.body.type,
        correctAns: req.body.correctAns,
        solution: req.body.solution,
        tags: req.body.tags
    };
   console.log(question);
    Questions.findByIdAndUpdate({ _id : req.query.id },question,{ new: true }, function (error, response){
         if (error) {
                res.json({
                    message: 'Error',
                    data: error
                });         
        }
        if (response) {
            console.log(response);
            return res.status(201).json({
                message: 'Success',
                data: response
            });
        }
        else {
            res.json({
                message: 'Failed'
            });
        }
    });
}