const express = require('express');
const router = express.Router();
var multer  = require('multer');

const publishedController = require('../controllers/publishTestController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
var upload = multer({
    storage: storage,
     limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



router.post('/savePublishTest',upload.single('file'),publishedController.savePublishTest);
router.get('/findPublishTest',publishedController.findPublishTest);
router.get('/getTestById',publishedController.getTestById)
module.exports= router;