const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("file", FileSchema);