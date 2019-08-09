const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');


router.post('/userLogin?:id',candidateController.userLogin);
// router.post('/addAdmin',adminUser.addAdmin);
// router.patch('/updateAdmin/:id',adminUser.updateAdmin);
// router.delete('/deleteAdmin/:id',adminUser.deleteAdmin);
// router.post('/forgetPassword',adminUser.forgetPassword);
// router.post('/resetPassword/:id',adminUser.resetPassword);
module.exports= router;