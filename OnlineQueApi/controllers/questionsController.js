const Questions = require('../models/questions');
const testTemplet = require('../models/testTemplets');

exports.addQuestion = (req, res) => {
    console.log(req.body.correctAnswers);
    var correctAns = [];
    if (typeof req.body.correctAnswers == 'string') {
        correctAns.push(req.body.correctAnswers);
    }
    else {
        for (var i = 0; i < req.body.correctAnswers.length; i++) {
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
    testTemplet.find({ "questions.question": req.params.id }).select('_id').exec().then((resp1) => {
        console.log(resp1);
        console.log(req.params.id);
        testTemplet.updateMany({}, { $pull: { questions: { question: req.params.id } } }, { upsert: true }).then(async (response, error) => {
            if (error) {
                res.json({
                    message: 'Error',
                    data: error
                });
            }
            if (response) {
                console.log(resp1[0]._id);
                for (let i = 0; i < resp1.length; i++) {
                    var result = await testTemplet.find({ _id: resp1[i]._id }).exec().then(async (responsefortesttmp) => {
                        console.log('testtemp1', responsefortesttmp)
                        var rightm = 0
                        if (responsefortesttmp[0].questions.length !== 0) {
                            for (let i = 0; i < responsefortesttmp[0].questions.length; i++) {
                                rightm = rightm + responsefortesttmp[0].questions[i].rightMarks;
                            }
                            console.log(rightm);
                            var resultOfUpdate = await testTemplet.updateOne({ _id: responsefortesttmp[0]._id }, { $set: { 'totalScore': rightm } }).then((resp2, error) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    console.log(resp2);
                                    return resp2;
                                }

                            });
                        } else {
                            var resultOfDelete = await testTemplet.findByIdAndDelete({ _id: responsefortesttmp[0]._id }).then((responseOfDeleteTest, error) => {
                                if (error) { console.log(error); }
                                if (responseOfDeleteTest) { console.log(responseOfDeleteTest); }
                                else { console.log("record not found"); }
                            });
                        }
                    });
                    Questions.findByIdAndDelete({ _id: req.params.id }).then((response) => {
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
            }
            else {
                console.log(response);
                res.json({
                    message: 'Failed'
                });

            }
        });
    });

}
exports.findQuestions = (req, res) => {
    console.log("=====", req.query.id);
    if (req.query.id) {
        Questions.find({ topicId: req.query.id }).exec().then((response) => {
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
    else {
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
exports.QuestionById = (req, res) => {
    console.log('***********');
    console.log('***********', req.query.id)
    Questions.findById({ _id: req.query.id }).populate({
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
exports.questionUsingSubjectId = (req, res) => {
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
            match: { 'subjectId': req.query.subjectId },
            model: 'questions'
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
    console.log(req.body);
    console.log(req.query.id);
    var question = {
        topicId: req.body.topicId,
        questionText: req.body.questionText,
        options: req.body.options,
        type: req.body.type,
        correctAns: req.body.correctAnswers,
        solution: req.body.solution,
        tags: req.body.tags
    };
    console.log(question);
    Questions.findByIdAndUpdate({ _id: req.query.id }, question, { new: true }, function (error, response) {
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
exports.getQuestion = (req, res) => {
    var data = [];
    console.log("kjdhfhskhdf");
    // Questions.find(
    //     {  $elemMatch: { tags : "xyz"}  }
    //  )
    Questions.find().select('tags').exec().then((response) => {
        if (response) {
            for (var i = 0; i < response.length; i++) {
                for (var j = 0; j < response[i].tags.length; j++) {
                    data.push(response[i].tags[j]);
                }
            }
            console.log(data)
            var unique = data.filter(onlyUnique); // returns ['a', 1, 2, '1']
            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }
            return res.send({
                data: unique
            });
        } else {
            res.json({
                massage: 'Failed'
            })
        }

    })
}
exports.getQueAsperTags = (req, res) => {
    console.log(req.body);

    Questions.find({ "tags": { $all: req.body.tag } }).
        select('_id questionText').then((response) => {
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
async function updateTotalScore(id) {
    console.log(id);
    try {

    }
    catch (err) {
        console.log(err)
        return res.status(500).send()
    }


}