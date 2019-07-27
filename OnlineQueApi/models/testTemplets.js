const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const testTemplet = new Schema({
    testName: String,
    description: String,
    questions: [{
        question: {
            type: Schema.Types.ObjectId,
            ref: 'questions'
        },
        rightMarks: Number,
        worngMarks: Number
    }],
    totalScore: Number,
    passingScore: Number,
    duration: Number,
    status: {
        type: String,
        enum: ['Draft','Published']
    }
});

module.exports = mongoose.model('testTemplet', testTemplet);