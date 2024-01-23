const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    role: String,
    language: String,
    github: String,
    leetcode: String,
    linkedin: String,
    resume: String,
    isMember: {
        type: Boolean,
        default: false, // Set the default value to false
    },
});

module.exports = mongoose.model('Member', memberSchema);