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
        unique: true,
        default: ""
    },
    linkedin: {
        type: String,
        unique: true,
        default: ""
    },
    instagram: {
        type: String,
        unique: true,
        default: ""
    },
    gfg: {
        type: String,
        unique: true,
        default: ""
    },
    codechef: {
        type: String,
        unique: true,
        default: ""
    },
    hackerrank: {
        type: String,
        unique: true,
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



  