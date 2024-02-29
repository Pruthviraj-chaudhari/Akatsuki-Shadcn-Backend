import { findById } from "../models/member";
import fetchProfilePhoto from "../utils/getGithubImage";

export async function updateProfile(req, res) {
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

    const existingUser = await findById(userId);

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
    if (!existingUser.isProfileComplete) {
      existingUser.isProfileComplete = true;

      // Fetch the profile photo separately only for the first-time completion
      const image = await fetchProfilePhoto(github);
      existingUser.image = image;
    }

    // Save the updated user
    const student = await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Profile cannot be updated. Please try again.",
    });
  }
}
