const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Locality: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("user", UserSchema);