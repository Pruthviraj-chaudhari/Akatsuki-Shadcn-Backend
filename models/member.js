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
        default: null
    },
    leetcode: {
        type: String,
        default: null
    },
    linkedin: {
        type: String,
        default: null
    },
    instagram: {
        type: String,
        default: null
    },
    gfg: {
        type: String,
        default: null
    },
    codechef: {
        type: String,
        default: null
    },
    hackerrank: {
        type: String,
        default: null
    },
    resume: {
        type: String,
        default: null
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
    visits: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Member', memberSchema);



  