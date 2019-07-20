const express = require('express');
const router = express.Router();
const adminUser = require('../controllers/adminUserController');


router.post('/adminLogin',adminUser.adminLogin);
router.post('/addAdmin',adminUser.addAdmin);
router.patch('/updateAdmin/:id',adminUser.updateAdmin);
router.delete('/deleteAdmin/:id',adminUser.deleteAdmin);
router.post('/forgetPassword',adminUser.forgetPassword);
router.post('/resetPassword/:id',adminUser.resetPassword);
module.exports= router;