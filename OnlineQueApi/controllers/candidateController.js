const user = require('../models/publishTest');
const Cryptr = require('cryptr');
const jwt = require('jsonwebtoken');
const cryptr = new Cryptr('myTotalySecretKey');
exports.userLogin = (req, res) => { 
//   const decryptedString = cryptr.decrypt(req.query.id);
    const decryptPassword =cryptr.decrypt(req.body.password);
   
    console.log(req.body);
    user.find({"candidateList.Email":req.body.email,"candidateList.Password": decryptPassword}).select('_id testId').exec().then((respons, error) => {
        if (error) {
            return res.json({
                message: 'Error',
                data: error
            });
        }
        if (respons) {
            var testId= [];
         for(let i=0;i<respons.length;i++)
         {
         if(!(testId.includes(respons[i].testId)))
         {
             testId.push(respons[i].testId);
         }
         }

            console.log(respons,testId)
            var token = jwt.sign({
                //testId: testId,
                email: req.body.email,
                authId: decryptPassword,                
            }, process.env.JWT_KEY,
                {
                    expiresIn: "2h"
                }
            );
           // console.log(token);
            return res.json({
                message: 'Success',
                token: token
            });
        } else {
            return res.json({
                message: 'Failed',
                data: respons
            });
        }
    })

    /**
     *   const decryptPassword =cryptr.decrypt(req.body.password);
console.log(decryptedString,decryptPassword);
console.log(req.body);
    user.aggregate(
        [
           {
              $project: {
                 _id: 1,
                 condidateList:{ $arrayToObject: { $literal:  [
                    [ "_id", decryptedString], [ "Email",req.body.email],["Password",decryptPassword]
                 ] } }
              }
           }
        ])
     .exec().then((respons)=>{
        console.log(respons);
    })                                                
}
     */
}