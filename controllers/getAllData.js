const mongoose = require("mongoose");
const Member = require("../models/member").default;

exports.getAllData = async (req, res) => {
  try {
    const { page = 1, pageSize = 1 } = req.query;
    const skip = (page - 1) * pageSize;

    const totalCount = await Member.countDocuments({ isProfileComplete: true });
    const totalPages = Math.ceil(totalCount / pageSize);

    const data = await Member.find({ isProfileComplete: true })
      .select('-password -token')
      .skip(skip)
      .limit(parseInt(pageSize));

    res.status(200).json({ data, totalPages });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid profile ID' });
    }

    const profile = await Member.findOne({ _id: id, isProfileComplete: true }).select('-password -token');

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Helper function to validate MongoDB ObjectId
function isValidObjectId(id) {
  const ObjectId = require('mongoose').Types.ObjectId;
  return ObjectId.isValid(id);
}

