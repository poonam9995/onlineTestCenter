const Topic = require('../models/topics');
const Questions = require('../models/questions');
const testTemplet = require('../models/testTemplets');

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

    // Questions.find({ topicId: req.params.id }).select('_id').then((response, error) => {
    //     if (error) {
    //         res.json({
    //             massage: 'Error',
    //             data: error
    //         });
    //     }
    //     if (response) {
    //         console.log(response)

    //         for (let i = 0; i < response.length; i++) {
    //             Questions.findByIdAndDelete({ _id: response[i]._id }, (response1,error) => {
    //                 if (error) {
    //                     res.json({
    //                         message: 'Error',
    //                         data: error
    //                     });
    //                 }
    //                 if (response1) {
    //                     console.log(response1)

    //                     // testTemplet.updateMany({}, { $pull: { questions: { question: response[i]._id } } }).then((response2, error) => {
    //                     //     if (error) {
    //                     //         res.json({
    //                     //             message: 'Error',
    //                     //             data: error
    //                     //         });
    //                     //     } if (response2) {
    //                     //         console.log(response2)
    //                     //         res.json({
    //                     //                         massage: 'Success',
    //                     //                         data: response2
    //                     //                     });
    //                     //     }

    //                     //     else {
    //                     //         res.json({
    //                     //             message: 'Failed'
    //                     //         });
        
    //                     //     }

    //                     // });
    //                 }
    //                 else {
    //                     res.json({
    //                         message: 'Failed'
    //                     });

    //                 }
    //             });
    //         }
    //     }
    //     else {
    //         console.log(response);
    //         res.json({
    //             message: 'Records not found',
    //         });
    //     }

    // });

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