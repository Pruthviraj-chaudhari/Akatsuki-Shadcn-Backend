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
    resume: String,
});

module.exports = mongoose.model('Member', memberSchema);