const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const subject = new Schema({
    subjectName:String,    
 });
 module.exports = mongoose.model('subject',subject);