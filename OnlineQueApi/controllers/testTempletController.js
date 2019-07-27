const testTemplet = require('../models/testTemplets');
exports.addTestTemplet = (req, res) => {
    testTemplet.findOne({ testName: req.body.testName }).then((response, error) => {
        console.log(response);
        if (error) {
            res.json({
                massage: 'Error',
            });
        }
        if (response) {
            console.log('**********', req.body);
            res.json({
                massage: 'Test Already Persent in Database.Plz Update it',
            });
        }
        else {
            console.log('&&&&&&&&&&', req.body);
            var question2 = [];
            for (var i = 0; i < req.body.questions.length; i++) {
                console.log(req.body.questions[i].question);
                question2[i] = {
                    question: req.body.questions[i].question,
                    rightMarks: req.body.questions[i].rightMarks,
                    worngMarks: req.body.questions[i].worngMarks
                }
            }
            console.log(question2);
            var test = new testTemplet({
                testName: req.body.testName,
                description: req.body.description,
                questions: question2,
                totalScore: req.body.totalScore,
                passingScore: req.body.passScore,
                duration: req.body.duration,
                status: req.body.status
            });
            console.log(test);

            test.save((error, response1) => {
                if (error) {
                    res.json({
                        message: 'Error',
                        data: error
                    });
                }
                if (response1) {
                    res.json({
                        message: 'Success',
                        data: response1
                    });
                    console.log(response1);
                }
                else {
                    res.json({
                        message: 'Failed'
                    });
                }
            });
        }
    });

}

exports.findTestTemplet = (req, res) => {
    console.log(req.query.id);
    if (req.query.id) {
        testTemplet.findById({ _id: req.query.id }).
            populate({ path: 'questions.question', select: 'questionText' }).
            exec().then((response, error) => {
                console.log(response);
                if (error) {
                    res.json({
                        massage: 'Error',
                        data: error
                    });
                }
                if (response) {
                    res.json({
                        massage: 'Success',
                        data: response

                    });
                } else {
                    res.json({
                        massage: 'Record is not present'
                    });
                }


            });
    }
    else {
        testTemplet.aggregate([
            {
                $project: {
                    _id: 1,
                    testName: 1,
                    status: 1,
                    totalScore:1,
                    passingScore:1,
                    numberOfQuestions: { $cond: { if: { $isArray: "$questions" }, then: { $size: "$questions" }, else: "NA" } }
                }
            }
        ]).then((response, error) => {
            if (error) {
                res.json({
                    message: 'Error'
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

exports.deleteTestTemplet = (req, res) => {
    console.log(req.params.id);
    testTemplet.findByIdAndDelete({ _id: req.params.id }).then((response, error) => {
        if (error) {
            res.json({
                message: 'Error',
                data: Error
            });

        }
        if (response) {
            res.json({
                message: 'Success',
                data: response
            });
        }
        else {
            res.json({
                message: 'Record is Not Found'
            });
        }
    });
}

exports.updateTestTemplet = function (req, res) {
    console.log(req.query.id);
    //  console.log(req.body);
    var question2 = [];

    for (var i = 0; i < req.body.questions.length; i++) {
       
        question2[i] = {
            question: req.body.questions[i].question,
            rightMarks: req.body.questions[i].rightMarks,
            worngMarks: req.body.questions[i].worngMarks
        }
    }
    console.log(question2);
    var test = {
        testName: req.body.testName,
        description: req.body.description,
        questions: question2,
        totalMarkes: req.body.totalScore,
        passingScore: req.body.passScore,
        duration: req.body.duration,
        status: req.body.status
    };
    console.log(test);
    testTemplet.findByIdAndUpdate({ _id: req.query.id }, test, { new: true },(error,response) => {
        if (error) {
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

        }
        else {
            res.json({
                message: 'Failed'
            });
        }
    });

}
exports.CheckUniqueTest = (req, res) => {
    console.log(req.body.testName);
    testTemplet.findOne({ testName: req.body.testName }).then((response, error) => {
        console.log(response);
        if (response) {
            res.json({
                massage: 'Test Already Persent in Database.Plz Update it',
            });
        }
        else {
            res.json({
                massage: 'test Not Present',
            });
        }
    });
}