const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: ""
    },
    github: {
        type: String,
        unique: true,
        default: ""
    },
    leetcode: {
        type: String,
        default: ""
    },
    linkedin: {
        type: String,
        default: ""
    },
    instagram: {
        type: String,
        default: ""
    },
    gfg: {
        type: String,
        default: ""
    },
    codechef: {
        type: String,
        default: ""
    },
    hackerrank: {
        type: String,
        default: ""
    },
    resume: {
        type: String,
        unique: true,
        default: ""
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
    token: {
        type: String,
    },
    isProfileComplete: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Member', memberSchema);



  