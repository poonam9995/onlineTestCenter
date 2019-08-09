const Topic = require('../models/topics');
const Questions = require('../models/questions');
const testTemplet = require('../models/testTemplets');
var async = require("async");
exports.addTopic = (req, res) => {
    console.log(req.body);
    var topic = new Topic({
        topicName: req.body.topicName,
        subjectId: req.body.subjectId
    });
    ///console.log(topic);
    topic.save((error, response) => {
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
exports.removeTopic = (req, res) => {
    var testTMPId = [];
    Questions.find({ 'topicId': req.params.id }).select('_id').exec().then(async (resp) =>{
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
        for (let i = 0; i < testTMPId.length; i++) {
            var result = await testTemplet.find({ _id: testTMPId[i] }).exec().then(async (responsefortesttmp) => {
                var rightm = 0
                console.log(responsefortesttmp);
                if (responsefortesttmp[0].questions.length !== 0) {
                    console.log('if block')
                    for (let i = 0; i < responsefortesttmp[0].questions.length; i++) {
                        rightm = rightm + responsefortesttmp[0].questions[i].rightMarks;
                    }
                    var resultOfUpdate = await testTemplet.updateOne({ _id: responsefortesttmp[0]._id }, { $set: { 'totalScore': rightm } }).then(async (resp2, error) => {
                        if (error) { console.log(error); }
                        if (resp2) { console.log('uadate total Score',resp2); }
                        else { console.log("record not found"); }
                    });
                } else {
              console.log('else block')
                   var resultOfDelete = await testTemplet.findByIdAndDelete({ _id: testTMPId[i]}).then((responseOfDeleteTest, error) => {
                        if (error) { console.log(error); }
                        if (responseOfDeleteTest){ console.log(responseOfDeleteTest); }
                        else { console.log("record not found"); }
                    });
                }
            });           
        }
    });
    Topic.findByIdAndDelete({ _id: req.params.id }).exec().then((response) => {
        if (response) {
            res.json({
                massage: 'Success',
                data: response
            });
        }
        else { res.json({ massage: 'Record Not Found'}); }
    });


}
exports.findTopic = (req, res) => {
    console.log("fdgsdgsd");

    if (req.query.subjectId) {
        console.log(req.query.subjectId);
        Topic.find({ subjectId: req.query.subjectId }).exec().then((response) => {
            if (response) {
                console.log(response);
                res.json({
                    message: 'Success',
                    data: response
                });
            } else {
                console.log(response);
                res.json({
                    message: 'Records not found',
                });
            }
        });
    }
    else {
        Topic.find().exec().then((response) => {
            if (response) {
                console.log(response);
                res.json({
                    message: 'Success',
                    data: response
                });
            } else {
                console.log(response);
                res.json({
                    message: 'Records not found',
                });
            }
        });
    }
}
exports.updataTopic = (req, res) => {
    console.log(req.body.topicName);
    console.log(req.query.id);
    var topic = {
        topicName: req.body.topicName,
    }
    console.log(topic);
    Topic.findByIdAndUpdate({ _id: req.query.id }, topic, { new: true }, (error, response) => {
        if (error) {
            console.log(error);
            res.json({
                message: 'Error',
                data: error
            });
        }
        if (response) {
            console.log(response);
            res.json({
                message: 'Success',
                data: response
            });
        } else {
            console.log(response);
            res.json({
                message: 'Records not found',
            });
        }
    });
}


