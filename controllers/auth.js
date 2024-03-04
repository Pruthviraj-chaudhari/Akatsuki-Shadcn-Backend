const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const Member = require("../models/member");
const OTP = require("../models/otp");

exports.signUp = async (req, res) => {
  try {
    const { fname, lname, email, password, confirmPassword, otp } = req.body;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    // Check if student already exists
    const existingStudent = await Member.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists. Please sign in to continue.",
      });
    }

    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = await Member.create({
      name: `${fname} ${lname}`,
      email,
      password: hashedPassword,
      role: "",
      about: "",
      github: null,
      leetcode: null,
      linkedin: null,
      instagram: null,
      gfg: null,
      codechef: null,
      hackerrank: null,
      resume: null,
      skills: [],
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        email: newMember.email,
        id: newMember._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Save token to the new member document in the database
    newMember.token = token;
    newMember.password = undefined;

    if (req.headers.cookie.includes("cookieConsent=true")) {
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        secure: true,
        httpOnly: false,
        sameSite: "None",
      };

      res.cookie("token", token, options);
    }

    res.status(200).json({
      success: true,
      token,
      student: newMember,
      message: "Student registered and logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Student cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please fill in all the required fields`,
      });
    }

    const student = await Member.findOne({ email });

    // If student not found with provided email
    if (!student) {
      return res.status(401).json({
        success: false,
        message: `Student not registered. Please sign up to continue`,
      });
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, student.password)) {
      const token = jwt.sign(
        {
          email: student.email,
          id: student._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      // Save token to student document in database
      student.token = token;
      student.password = null;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        secure: true,
        httpOnly: false,
        sameSite: "None",
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        student,
        message: `Student Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Incorrect password. Please try again.`,
      });
    }
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login failed. Please try again later`,
    });
  }
};

exports.sendotp = async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required to send OTP",
      });
    }

    const checkPresent = await Member.findOne({ email });

    if (checkPresent) {
      return res.status(401).json({
        success: false,
        message: "Student already registered",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);

    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while sending OTP",
      error: error.message,
    });
  }
};

exports.logout = (req, res) => {
  // Clear the cookie on the server side
  res.clearCookie("token");

  // You can also perform additional actions if needed

  res.status(200).json({ success: true, message: "Logout successful" });
};
