const Member = require("../models/member");

exports.addMember = async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      role = "",
      language = "",
      github = "",
      leetcode = "",
      resume = "",
    } = req.body;

    const foundMember = await Member.find({
      $or: [
        { email: email },
        { github: github },
        { leetcode: leetcode },
      ],
    });

    if(foundMember.length > 0){
      return res.status(400).json({
        success: false,
        message: "Member Already Responded",
      })
    }

    const newMember = await Member.create({
      name,
      email,
      role,
      language,
      github,
      leetcode,
      resume,
    });

    return res.status(200).json({
      success: true,
      newMember,
      message: "New Member added",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Member cannot be added. Please try again.",
    });
  }
};
