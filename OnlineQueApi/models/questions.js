const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questions = new Schema({
    topicId: {
        type: Schema.Types.ObjectId,
        ref: 'topic'
    },
    questionText: String,
    options: {type: Array
    },
    type: String,
    correctAns: {
        type: [Number]    
    },
    solution: String,
    tags: {
        type: [String]
    }
});

// questions.path('options').validate(validator, 'validation of `{PATH}` failed with value `{VALUE}`');
// function validator (val) {
//     return val.length <6;
//   }
module.exports = mongoose.model('questions', questions);