const mongoose = require('mongoose');
const { Schema } = mongoose;

const DogSchema = new Schema({
    Dog_ID: {
        type: String,
        required: true,
        unique: true,
    },
    Name: {
        type: String,           //changed from String to Object
        required: true,
    },
    Nature: {
        type: Object,
        required: true,
    },
    General_Features: {
        type: String,
        required: true,
    },
    Frequently_Visited_Places: {
        type: String,
        required: true,
    },
    Location_Coordinates: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("dog", DogSchema);