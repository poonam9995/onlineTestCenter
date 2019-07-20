const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const admin = new Schema({
     firstName:String,
     lastName :String,
     email:String,
     password :String,
     status:String,    
 });
 module.exports = mongoose.model('admin',admin);