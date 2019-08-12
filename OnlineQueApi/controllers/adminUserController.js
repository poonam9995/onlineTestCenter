const Admin = require('../models/adminUser');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

exports.addAdmin = (req, res) => {
    // console.log('post',req.body);

    Admin.findOne({ email: req.body.email }, function (err, respons) {
     //   console.log('kjdhfjkhdjkfh', respons);
        if (err) {
            console.log(err);
            res.send({
                message: 'Error Occure',
                data:err
            })
        }
        if (respons) {
            console.log('kjdhfjkhdjkfh', respons);
            res.status(201).json({
                message: 'User Already Has Account'
            });
        }
        else {
            var hash = bycrpt.hashSync(req.body.password, 10);
            var admin = new Admin({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                status: req.body.status
            });
            // console.log('************', admin);
            admin.save((err, respons1) => {
                if (err) {
                    console.log(err);
                    res.send({
                        message: 'Error Occure',
                        data:err
                    })
                }
                if (respons1) {
                    console.log(respons1);
                    res.status(201).json({
                        message: 'Success',
                        data: respons1
                    });
                }

            });
        }

    });
}
exports.adminLogin = (req,res) => {
    console.log("admin");
    console.log(req.body);
    Admin.find({ email: req.body.email }).exec().then(respons => {
    
        if (respons.length < 1) {
            return res.json({
                message: 'Auth failed'
            });
        }
        console.log(req.body.password, respons[0].password)
        bycrpt.compare(req.body.password, respons[0].password, (error, respons1) => {
            console.log(respons1);
            if (error) {
                return res.json({
                    message: 'Error',
                    data: error
                });
            }
            if (respons1) {
                console.log(respons1);
                var token = jwt.sign({
                    email: respons[0].email,
                    authId: respons[0]._id
                }, process.env.JWT_KEY,
                    {
                        expiresIn: "2h"
                    }
                );
                console.log(token);
                console.log(respons1);
                return res.json({
                    message:'Success',
                    data: respons,
                    token: token
                });
            } else {
                return res.json({
                    message: 'Failed',
                    data: respons1
                });
            }
        });
    });
}
exports.forgetPassword = (req, res) => {
    //console.log(req.body.email);
    Admin.findOne({ email: req.body.email }).exec().then(respons => {
        if (respons.length < 1) {
            return res.json({
                message: 'Auth Failed'
            });
        }
        else {
            console.log(respons);
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
            const encryptedString = cryptr.encrypt(respons._id);
            console.log('encrypted password', encryptedString);
            const mailOptions = {
                from: 'poonamshivatare@gmail.com', // sender address
                to: respons.email, // list of receivers
                subject: 'Change Password', // Subject line
                text: 'To rest the password http://localhost:4200/#/auth/resetPassword/' + encryptedString + ' click here'// plain text body
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
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
    }

    );
}
exports.resetPassword = (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    var decryptPassword = cryptr.decrypt(req.params.id);
    var hash = bycrpt.hashSync(req.body.password, 10);
    console.log(hash);
    console.log(decryptPassword);
    var pass = {
        password: hash
    };
    Admin.findByIdAndUpdate({ _id: decryptPassword }, pass, { new: true }, (error, respons) => {
        if (error) {
            console.log(error);
            console.log('Error in Employee update' + JSON.stringify(err, undefined, 2));
            return res.json({
                message: 'Failed',
            });
        }
        if (respons) {

            console.log(respons);
            return res.json({
                message: 'Success',
                data: respons
            });
        }
        else {
            return res.json({
                message: 'Auth Failed',
            });
        }
    });
}
exports.updateAdmin = (req, res) => {
    console.log(req.params.id);
    Admin.findOne({ _id: req.params.id }, function (error, respons) {
        if (error) {
            console.log(error);
            res.status(201).json({
                message: 'Error'
            });
        }
        if (respons) {
            console.log(respons);
            var hash = bycrpt.hashSync(req.body.password, 10);
            var admin = new Admin({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                status: req.body.status
            });
            Admin.findByIdAndUpdate({ _id: req.params.id }, admin, function (error, respons) {
                if (error) {
                    res.status(201).json({
                        message: 'Error',
                        data: error
                    });
                }
                if (respons) {
                    res.status(201).json({
                        message: 'Successed',
                        data: respons
                    });
                }
                else {
                    res.status(201).json({
                        message: 'Failed',
                    });
                }
            });
        }
        else {
            res.status(201).json({
                message: 'User Not Found..'
            });
        }
    });
}
exports.deleteAdmin = (req, res) => {
    console.log(req.params.id);
    Admin.findByIdAndDelete({ _id: req.params.id }, function (error, respons) {
        if (error) {
            console.log(error);
        }
        if (respons) {
            console.log(respons);
        } else {
            console.log('respons');
        }
    });
}
exports.adminLoginInfo =(req, res)=>{
    Admin.find().then((respons,error) =>{
     if(error){
         res.json({
             message:"Error",
             data:error
         });
     }
     if(respons.length>0){
        res.json({
            message:"Record Present",
            data:respons
        });
     }else{
        res.json({
            message:"Succes",
            data:respons
        });
     }
    });

   
}