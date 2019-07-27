const Subject = require('../models/subject');
const Questions = require('../models/questions');
const Topic = require('../models/topics');
const testTemplet = require('../models/testTemplets');
var async = require("async");

exports.addSubject = (req, res) => {
    console.log(req.body.subjectName);
    var subject = new Subject({
        subjectName: req.body.subjectName
    });
    //  console.log("post", admin);
    Subject.findOne({ subjectName: req.body.subjectName }, (err, res1) => {
        if (err) {
            res.json({
                message: 'error Occure',
                data: err
            });
            console.log('error Occure', err);
        }
        if (res1) {
            res.json({
                message: 'Subject already present in DB..',
                data: res1
            });
            console.log('Subject already present in DB..');
        }
        else {
            subject.save((err, response) => {
                if (err) {
                    res.json({
                        message: 'error Occure',
                        data: err
                    });
                    console.log(err);
                }
                else {
                    console.log(response);
                    res.json({
                        message: 'Success',
                        data: response
                    });
                }
            })
        }
    });

}
exports.removeSubject = (req, res) => {
    console.log(req.params.id);

    // Topic.find({'subject'},{ $pull: { questions: {question: req.params.id }}},{upsert:true}).then((response,error)=>{});

    Topic.find({ 'subjectId': req.params.id }).select('_id topicName').exec().then((response) => {
        //console.log(response);
        async.each(response, function (topic, callbackTopic) {
            console.log(topic)
            // if (topic) {
            //     Questions.find({ 'topicId': topic._id }).select('_id').exec().then((resp) => {
            //         async.each(resp, function (question, callbackQuestion) {
            //             testTemplet.find({ 'questions.question': question._id }).select('totalScore questions').exec().then((resp1) => {
            //                 async.each(resp1, function (testTemplQue, callbackTestTemp) {
            //                     // var totalscore = 0;
            //                     // var rightmark = 0;
            //                     console.log(testTemplQue);                       
            //                     async.each(testTemplQue.questions,function(questionId,callbackQuestion){
            //                         console.log(questionId);   
            //                     })
            //                     for (let k = 0; k < testTemplQue.questions.length; k++) {
            //                         if ((testTemplQue.questions[k].question).toString() == (question._id).toString()) {
            //                                 rightmark = testTemplQue.questions[k].rightMarks;
            //                             }
            //                         }

            //                     console.log('After rightmark score', rightmark, 'before total score', testTemplQue.totalScore);
            //                     totalscore = testTemplQue.totalScore - rightmark;
            //                     console.log('After score', totalscore);
            //                     var mark = {
            //                         totalScore: totalscore
            //                     }
            //                     testTemplet.updateOne({ _id: testTemplQue._id }, { $set: {'totalScore': totalscore} }).then(async(resp2, error) => {

            //                         if (error) {
            //                             console.log(error)
            //                         }
            //                         else {
            //                             console.log(resp2);
            //                         }
            //                         return await 0;
            //                     });
            //                     callbackTestTemp(result);
            //                 }, function(err) {
            //                     // if any of the file processing produced an error, err would equal that error
            //                     if( err ) {
            //                       // One of the iterations produced an error.
            //                       // All processing will now stop.
            //                       console.log('A file failed to process');
            //                     } else {
            //                       console.log('All files have been processed successfully');
            //                     }
            //                 });


            //                 // console.log(totalscore)

            //             })

            //             // testTemplet.updateMany({},{ $pull: { questions: { question: resp[j]._id  }}},{upsert:true}).then((response1, error) => {
            //             //     console.log(response1);
            //             //      });                        

            //             callbackQuestion(result);

            //         } , function(err) {
            //             // if any of the file processing produced an error, err would equal that error
            //             if( err ) {
            //               // One of the iterations produced an error.
            //               // All processing will now stop.
            //               console.log('A file failed to process');
            //             } else {
            //               console.log('All files have been processed successfully');
            //             }
            //         });
            //         // Questions.remove({ topicId :response[i]._id}).then((response2, error) => {
            //         //     console.log(response2);
            //         //      });
            //     });
            // }
            callbackTopic(result);
        }, function(err) {
            // if any of the file processing produced an error, err would equal that error
            if( err ) {
              // One of the iterations produced an error.
              // All processing will now stop.
              console.log('A file failed to process');
            } else {
              console.log('All files have been processed successfully');
            }
        });
    });
    //   Topic.remove({subjectId:req.params.id}).then((responseForDeTopic)=>{
    // if(responseForDeTopic){
    //     Subject.findByIdAndDelete({ _id: req.params.id }).then((err, subject) => {
    //         if (err) {
    //             return res.json({
    //                 masseg: 'Error Occcure',
    //                 data: err
    //             });
    //         }
    //         if (subject) {
    //             console.log(subject);
    //             return res.json({
    //                 masseg: 'Success',
    //                 data: subject
    //             });
    //         }
    //         else {
    //             return res.json({
    //                 masseg: 'Failed'
    //             });
    //         }
    //     });
    // }
    //   });
}
exports.findSubject = (req, res) => {
    console.log("jjhghjjhj");
    Subject.find().then(response => {
        console.log(response);
        if (response) {
            console.log(response);
            return res.json({
                masseg: 'successed',
                data: response
            });
        } else {
            console.log(response);
            return res.json({
                masseg: 'Records not found',
            });
        }
    });
}

