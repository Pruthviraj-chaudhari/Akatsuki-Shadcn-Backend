const mongoose = require("mongoose");
const Member = require("../models/member");

exports.getAllData = async(req, res) => {
    const data = await Member.find({});

    res.status(200).json({
        Akatsuki_Members: data
    })    
}
