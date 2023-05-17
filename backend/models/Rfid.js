const mongoose = require('mongoose');
const { Schema } = mongoose;

const RFIDSchema = new Schema({
    RFID: {
        type: String,
        required: true,
        unique: true,
    },
    Bought_From: {
        type: String,
        required: true,
        unique: true,
    },
    Assigned_to: {              // _id Attribute of dog Schema
        type: String,
        unique: true,
    },
});

module.exports = mongoose.model("rfid", RFIDSchema);