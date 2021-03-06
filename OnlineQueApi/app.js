const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/adminUserRouter');
const questionRouter = require('./routes/questionRouter');
const subjectRouter = require('./routes/subjectRouter');
const topicRouter =require('./routes/topicRouter');
const testTempRouter = require('./routes/testTempletRouter');
const publishTestRouter = require('./routes/publishTestRouter');
const candidateRouter = require('./routes/candidateRouter');
const examRouter = require('./routes/examRouter');
const mongoose = require('./db.js'); 
const cors = require('cors');
//const mongoose= require('mongoose');
const checkAuth = require('./middleware/checkAuth');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:4300'}));
app.use(cors({ origin: 'http://localhost:4200'}));

app.use('/admin',adminRouter);
app.use('/subject',checkAuth,subjectRouter);
app.use('/topic',checkAuth,topicRouter);
app.use('/testTemplet',checkAuth,testTempRouter);
app.use('/questions',checkAuth,questionRouter);
app.use('/publishTest',checkAuth,publishTestRouter);
app.use('/exam',checkAuth,examRouter)

app.use('/user',candidateRouter);
app.listen(process.env.port || 8080,function(){
    console.log('Listen port 8080');
});