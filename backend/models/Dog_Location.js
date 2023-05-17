const mongoose = require('mongoose');
const { Schema } = mongoose;

const DoglocationSchema = new Schema({
    Location: {                       // _id Attribute of Dog Schema
        type: Array,
        unique: true,
    },
    Pointer: {
        type: String,
        unique: true,
    }
});

module.exports = mongoose.model("doglocation", DoglocationSchema);