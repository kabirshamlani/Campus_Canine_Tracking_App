const mongoose = require('mongoose');
const { Schema } = mongoose;

const VoteSchema = new Schema({
    Dog_ID: {
        type: String,
        required: true,
    },
    User_ID: {
        type: String,
        required: true,
    },
    Choice: {
        type: String,
    },
});

module.exports = mongoose.model("vote", VoteSchema);