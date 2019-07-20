const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const topic = new Schema({
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
        },
    topicName:String
});
module.exports = mongoose.model('topic', topic);