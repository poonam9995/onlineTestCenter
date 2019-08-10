const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const publishTest = new Schema({
    title: String,
    description: String,
    candidateList: [
        {
            Name: String,
            Email: String,
            Password: String,
            result: {
                marks: Number,
                status: String,
                candidateAnswer: [{
                    id: String,
                    status: String,
                    candidateAns: [],
                }],
            }
        }
    ],
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'testTemplet'
    },
    testDate: Date
});
module.exports = mongoose.model('publishTest', publishTest);