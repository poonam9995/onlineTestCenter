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


    Topic.find({ 'subjectId': req.params.id }).select('_id topicName').exec().then(async (response) => {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
            var testTMPId = [];
            var resulrOfQuestion = await Questions.find({ 'topicId': response[i]._id }).select('_id').exec().then(async (resp) => {
                for (let i = 0; i < resp.length; i++) {
                    var result = await testTemplet.find({ "questions.question": resp[i]._id }).select('_id').exec().then(async (testId) => {
                        for (let j = 0; j < testId.length; j++) {
                            var check = testTMPId.includes(testId[j]._id.toString());
                            if (!check) {
                                testTMPId.push(testId[j].id)
                            }
                        }
                    });
                    var resultForDelted = await testTemplet.updateMany({}, { $pull: { questions: { question: resp[i]._id } } }, { upsert: true }).then(async (response, error) => {
                        if (error) { res.json({ message: 'Error', data: error }); }
                        if (response) { console.log(response); }
                    });

                    var resultdeleteQue = await Questions.findByIdAndDelete({ _id: resp[i]._id }).then((responseofDeleteque) => {
                        if (responseofDeleteque) {
                            console.log(responseofDeleteque);
                            // res.json({message: 'Success',
                            // data: responseofDeleteque});
                        }
                        else { res.json({ message: 'Failed' }); }
                    });
                }
             
            });
            for (let i = 0; i < testTMPId.length; i++) {
                var result = await testTemplet.find({ _id: testTMPId[i] }).exec().then(async(responsefortesttmp) => {
                    var rightm = 0
                    console.log(responsefortesttmp);
                    if (responsefortesttmp[0].questions.length !== 0) {
                        console.log('if block')
                        for (let i = 0; i < responsefortesttmp[0].questions.length; i++) {
                            rightm = rightm + responsefortesttmp[0].questions[i].rightMarks;
                        }
                        var resultOfUpdate = await testTemplet.updateOne({ _id: responsefortesttmp[0]._id }, { $set: { 'totalScore': rightm } }).then(async (resp2, error) => {
                            if (error) { console.log(error); }
                            if (resp2) { console.log('uadate total Score', resp2); }
                            else { console.log("record not found"); }
                        });
                    } else {
                        console.log('else block')
                        var resultOfDelete = await testTemplet.findByIdAndDelete({ _id: testTMPId[i] }).then((responseOfDeleteTest, error) => {
                            if (error) { console.log(error); }
                            if (responseOfDeleteTest) { console.log(responseOfDeleteTest); }
                            else { console.log("record not found"); }
                        });
                    }
                });
            }
           var resultOdDelteTpoic = await Topic.findByIdAndDelete({_id:response[i]._id }).then((responseForDeTopic)=>{
            console.log(responseForDeTopic);
            });
        }

    });
    Subject.findByIdAndDelete({ _id: req.params.id }).then((err, subject) => {
                if (err) {
                    return res.json({
                        masseg: 'Error Occcure',
                        data: err
                    });
                }
                if (subject) {
                    console.log(subject);
                    return res.json({
                        masseg: 'Success',
                        data: subject
                    });
                }
                else {
                    return res.json({
                        masseg: 'Failed'
                    });
                }
            });
    //  
    // Topic.findByIdAndDelete({ _id: req.params.id }).exec().then((response) => {
    //     if (response) {
    //         res.json({
    //             massage: 'Success',
    //             data: response
    //         });
    //     }
    //     else { res.json({ massage: 'Record Not Found'}); }
    // });

    // Topic.find({ 'subjectId': req.params.id }).select('_id topicName').exec().then((response) => {
    //     //console.log(response);
    //     async.each(response, function (topic, callbackTopic) {
    //         // console.log(topic)
    //         if (topic) {
    //             Questions.find({ 'topicId': topic._id }).select('_id').exec().then((resp) => {
    //                 console.log("questions 2", resp)
    //                 async.each(resp, function (question, callbackQuestion) {


    //                     testTemplet.updateMany({}, { $pull: { questions: { question: question._id } } }, { upsert: true }).then(async (response1, error) => {
    //                         console.log(response1);
    //                         const valueA = await updateTotalScore(question._id);
    //                         console.log(valueA)

    //                     });

    //                     callbackQuestion();

    //                 }, function (err) {
    //                     // if any of the file processing produced an error, err would equal that error
    //                     if (err) {
    //                         // One of the iterations produced an error.
    //                         // All processing will now stop.
    //                         console.log('A file failed to process callbackQuestion');
    //                     } else {
    //                         //    console.log('All files have been processed successfully callbackQuestion');
    //                     }
    //                 });
    //                 // Questions.remove({ topicId :response[i]._id}).then((response2, error) => {
    //                 //     console.log(response2);
    //                 //      });
    //             });
    //         }
    //         callbackTopic();
    //     }, function (err) {
    //         // if any of the file processing produced an error, err would equal that error
    //         if (err) {
    //             // One of the iterations produced an error.
    //             // All processing will now stop.
    //             console.log('A file failed to process callbackTopic');
    //         } else {
    //             //  console.log('All files have been processed successfully callbackTopic');
    //         }
    //     });
    // });
    //   Topic.remove({subjectId:req.params.id}).then((responseForDeTopic)=>{
    // if(responseForDeTopic){
    //    
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
var i = 0;
async function updateTotalScore() {

    try {


        testTemplet.find({}).select('_id totalScore questions.rightMarks').exec().then((resp1) => {
            console.log('testtemp1', resp1[0])
            var rightm = 0
            for (let i = 0; i < resp1[0].questions.length; i++) {

                rightm = rightm + resp1[0].questions[i].rightMarks;
            }
            console.log(rightm);
            testTemplet.updateOne({ _id: testtemp._id }, { $set: { 'totalScore': rightm } }).then((resp2, error) => {

            });
            if (error) {
                return error;
            }
            else {
                console.log(resp2);
                return resp2;

            }


        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).send()
    }


}

