const publishTest = require('../models/publishTest');
const XLSX = require('xlsx');
const testTemplet = require('../models/testTemplets');
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var dateFormat = require('dateformat');
exports.savePublishTest = (req, res) => {
    console.log(req.body);

    var workbook = XLSX.readFile(req.file.path);// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part

    var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook

    data1 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); //if you have multiple sheets
    var publish = new publishTest({
        'title': req.body.title,
        'description': req.body.description,
        'testId': req.body.testId,
        'testDate': req.body.testDate,
        'candidateList': data1,
    })
    console.log(publish);
    publish.save((error,response) => {
        if (error) {
            res.json({
                message: 'Error',
                data: error
            });
        }
        if (response) {

            console.log('response Data',response);
            // res.json({
            //     message: 'Success',
            //     data: response
            // });



for(let i=0; i<response.candidateList.length;i++){

    var transporter = nodemailer.createTransport({
                service: 'Gmail',
                secure: false,
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    type: "login",
                    user: 'poonamshivatare@gmail.com',
                    pass: 'kufpcfaruigavjnd'
                }
            });
           // console.log(transporter);
            const encryptedString = cryptr.encrypt(response._id);
            const password = cryptr.encrypt(response.candidateList[i].Password);
            const date = dateFormat(response.testDate, "dddd, mmmm dS, yyyy, h:MM:ss TT");
            console.log('encrypted password', encryptedString);
            const mailOptions = {
                from: 'poonamshivatare@angularminds.com', // sender address
                to: response.candidateList[i].Email, // list of receivers
                subject: 'AngularMinds Test URL ', // Subject line
                text: `  User Id : ${response.candidateList[i].Email}
                         Password :   ${response.candidateList[i].Password}
                         Date and Time for Test Start   ${date} 
                         http://localhost:4200/#/user/login click here to get the URL`// plain text body
            
                };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err){
                    res.json({
                        message: 'email transfer failed',
                        error: err
                    });
                }
                else {
                    res.status(200).json({
                        message: 'Success',
                        info: info
                    });
                }
            });
}
        //   
        }else{
            res.json({
                message:'Record not inserted',
               
                       });
        }
    });
}
exports.findPublishTest= (req, res)=>{
    publishTest.find()
               .populate({path : 'testId',select:'testName'})
               .exec().then((response)=>{
        console.log(response);
        if(response)
        {
            res.json({
                message:'Success',
                data: response
            });


        }
        else{
            res.json({
                message:'Records Not Present',
                });
            
        }
    })
}
exports.getTestById=(req, res)=>{
    console.log("jhgjhg",req.userData);

    publishTest.find({"candidateList.Email":req.userData.email,"candidateList.Password": req.userData.authId})
               .populate({path : 'testId',select:'testName , questions , duration'}).select('testId')
               .exec().then((respons, error) => {
                console.log(respons);
                if(respons)
                {
                    res.json({data: respons});
                }
    });
    // testTemplet.findById({_id:req.userData.testId}).then((response)=>{
    //    // console.log(response);
    // });

}