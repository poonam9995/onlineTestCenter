const Questions = require('../models/questions');
const testTemplet = require('../models/testTemplets');
//Deatils for Desplay test Questions
exports.getTestDetails =(req, res)=>{
    console.log(req.query.id);
    testTemplet.find({_id: req.query.id})
                .populate({path:'questions.question'})
               .exec().then((response)=>{
        console.log(response);
        if(response)
        {
            res.json(response);
        }
    });
}