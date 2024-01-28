const mongoose = require("mongoose");
const Member = require("../models/member");

exports.getAllData = async (req, res) => {
  try {
    const data = await Member.find({});
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
