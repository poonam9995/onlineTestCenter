const Subject = require('../models/subject');

exports.addSubject = (req, res) => {
    console.log(req.body.subjectName);
    var subject = new Subject({
        subjectName: req.body.subjectName
    });
    //  console.log("post", admin);
    Subject.findOne({ subjectName : req.body.subjectName },( err, res1) => {
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

