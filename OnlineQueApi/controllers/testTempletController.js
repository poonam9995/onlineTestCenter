const testTemplet = require('../models/testTemplets');
exports.addTestTemplet = (req, res) => {
    console.log(req.body);
    var question2 = [];

    for (var i = 0; i < req.body.questions.length; i++) {
        console.log(req.body.questions[i].question);
        question2[i] = {
            question: req.body.questions[i].question,
            rightMarkes: req.body.questions[i].rightMarkes,
            wrongMarkes: req.body.questions[i].wrongMarkes
        }
    }
    console.log(question2);
    var test = new testTemplet({
        testName: req.body.testName,
        description: req.body.description,
        questions: question2,
        totalMarkes: req.body.totalMarkes,
        passingScore: req.body.passingScore,
        duration: req.body.duration,
        status: req.body.status
    });
    console.log(test);

    test.save((error, response) => {
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

exports.findTestTemplet = (req, res) => {
    testTemplet.find().then((error, response) => {
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

exports.deleteTestTemplet = (req, res)=>{
    console.log(req.params.id);
    testTemplet.findByIdAndDelete({_id : req.params.id}).then((error , response)=>{
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

exports.updateTestTemplet =function(req,res){
  //  console.log(req.params.id);
  //  console.log(req.body);
    var question2 = [];

    for (var i = 0; i < req.body.questions.length; i++) {
        console.log(req.body.questions[i].question);
        question2[i] = {
            question: req.body.questions[i].question,
            rightMarkes: req.body.questions[i].rightMarkes,
            wrongMarkes: req.body.questions[i].wrongMarkes
        }
    }
    //console.log(question2);
    var test = {
        testName: req.body.testName,
        description: req.body.description,
        questions: question2,
        totalMarkes: req.body.totalMarkes,
        passingScore: req.body.passingScore,
        duration: req.body.duration,
        status: req.body.status
    };
   // console.log(test);
    testTemplet.findOneAndUpdate({_id : req.params.id},test,{new :true},(error , response)=>{
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