const Member = require("../models/member");
const fetchProfilePhoto = require("../Utils/getGithubImage");

exports.addMember = async (req, res) => {
  try {
    const {
      fname = "",
      lname = "",
      email = "",
      role = "",
      about = "",
      github = "",
      leetcode = "",
      linkedin = "",
      instagram = "",
      gfg = "",
      codechef = "",
      hackerrank = "",
      resume = "",
      skills = [],
    } = req.body;

    console.log(req.body);

    const foundMember = await Member.find({
      $or: [
        { email: email },
        { github: github },
        { linkedin: linkedin },
        { leetcode: leetcode },
      ],
    });

    if (foundMember.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Member Already Responded",
      });
    }

    const image = await fetchProfilePhoto(github);

    const name = `${fname} ${lname}`;

    const newMember = await Member.create({
      name,
      email,
      role,
      about,
      github,
      leetcode,
      linkedin,
      instagram,
      gfg,
      codechef,
      hackerrank,
      resume,
      image,
      skills,
    });

    console.log("New Member Added 🎉");

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
