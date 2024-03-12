const Member = require("../models/member");

async function fetchProfilePhoto(profileLink) {
  try {
    const githubUsername = new URL(profileLink).pathname.split("/")[1];
    if (!githubUsername) {
      console.error("Invalid GitHub profile link");
      return null;
    }

    const response = await fetch(
      `https://api.github.com/users/${githubUsername}`
    );
    if (response.ok) {
      const { avatar_url } = await response.json();
      return avatar_url;
    } else {
      console.error(
        `Error: Unable to fetch data. Status code: ${response.status}`
      );
      return null;
    }
  } catch (error) {
    console.error(`Unexpected error: ${error}`);
    return null;
  }
}

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
    } = req.body;

    const existingUser = await Member.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update only the fields that are present in the request body
    existingUser.role = role || existingUser.role;
    existingUser.about = about || existingUser.about;
    existingUser.github = github || existingUser.github;
    existingUser.leetcode = leetcode || existingUser.leetcode;
    existingUser.linkedin = linkedin || existingUser.linkedin;
    existingUser.instagram = instagram || existingUser.instagram;
    existingUser.gfg = gfg || existingUser.gfg;
    existingUser.codechef = codechef || existingUser.codechef;
    existingUser.hackerrank = hackerrank || existingUser.hackerrank;
    existingUser.resume = resume || existingUser.resume;
    existingUser.skills = skills || existingUser.skills;


    // Set isProfileComplete to true if it's the first-time completion
    if (existingUser.isProfileComplete === false) {
      const image = await fetchProfilePhoto(github);

      if (image) {
        existingUser.image = image;
      }
      
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

