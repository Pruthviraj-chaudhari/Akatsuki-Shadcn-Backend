const Member = require("../models/member");

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(500).json({
        success: false,
        message: "Please login before updating profile",
      });
    }

    // Extract fields from the request body
    const {
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
      skills,
      image,
    } = req.body;

    const existingUser = await Member.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Helper function to ensure "https://" prefix in the URL
    const ensureHttps = (url) => {
      if (url && !url.startsWith("https://")) {
        return "https://" + url;
      }
      return url;
    };

    // Update only the fields that are present in the request body
    existingUser.role = role || existingUser.role;
    existingUser.about = about || existingUser.about;
    existingUser.github = ensureHttps(github) || existingUser.github;
    existingUser.leetcode = ensureHttps(leetcode) || existingUser.leetcode;
    existingUser.linkedin = ensureHttps(linkedin) || existingUser.linkedin;
    existingUser.instagram = ensureHttps(instagram) || existingUser.instagram;
    existingUser.gfg = ensureHttps(gfg) || existingUser.gfg;
    existingUser.codechef = ensureHttps(codechef) || existingUser.codechef;
    existingUser.hackerrank = ensureHttps(hackerrank) || existingUser.hackerrank;
    existingUser.resume = ensureHttps(resume) || existingUser.resume;
    existingUser.skills = skills || existingUser.skills;

    if (image) {
      existingUser.image = image;
    }
    // Set isProfileComplete to true if it's the first-time completion
    if (existingUser.isProfileComplete === false) {
      existingUser.isProfileComplete = true;
    }

    // Save the updated user
    const user = await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Profile cannot be updated. Please try again.",
    });
  }
};
