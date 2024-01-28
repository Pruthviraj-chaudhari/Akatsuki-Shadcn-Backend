const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    role: String,
    about: String,
    github: {
        type: String,
        unique: true
    },
    leetcode: {
        type: String,
        unique: true
    },
    linkedin: {
        type: String,
        unique: true
    },
    instagram: {
        type: String,
        unique: true
    },
    gfg: {
        type: String,
        unique: true
    },
    codechef: {
        type: String,
        unique: true
    },
    hackerrank: {
        type: String,
        unique: true
    },
    resume: {
        type: String,
        unique: true
    },
    image: {
        type: String,
        default: function () {
            const encodedName = encodeURIComponent(this.name);
            return `https://ui-avatars.com/api/?name=${encodedName}`;
        },
    },
    skills: {
        type: [String], 
        default: [],   
    },
});

module.exports = mongoose.model('Member', memberSchema);



  