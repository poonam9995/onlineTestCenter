const Topic = require('../models/topics');

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
    console.log(req.params.id);
    Topic.findByIdAndDelete({ _id: req.params.id }).exec().then((response) => {
        if (response) {
            res.json({
                massage: 'Success',
                data: response
            });
        }
        else {
            res.json({
                massage:'Record Not Found',
            });
        }
    });

}
exports.findTopic = (req, res) => {
    console.log("fdgsdgsd");
    
    if(req.query.subjectId){
        console.log( req.query.subjectId);
        Topic.find({subjectId :req.query.subjectId }).exec().then((response) => {
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
    else{
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
exports.updataTopic = (req, res)=>{
 console.log(req.body.topicName);
    console.log( req.query.id);
    var topic = {
        topicName: req.body.topicName,
    }
    console.log(topic);
    Topic.findByIdAndUpdate({_id: req.query.id},topic,{ new: true },(error,response ) => {
       if(error){
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