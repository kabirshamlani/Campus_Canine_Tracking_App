const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    Dog_Id: {                       // _id Attribute of Dog Schema
        type: String,
    },
    Comment: {
        type: String,
    },
    Posted_By: {                    // _id Attribute of users Schema
        type: String,
    },
});

module.exports = mongoose.model("comment", CommentSchema);