const express = require("express");
const { updateProfile } = require("../controllers/update");
const { getAllData, getProfileById } = require("../controllers/getAllData");
const { signUp, login, sendotp, logout } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/api/getData", getAllData);
router.get("/api/profiles/:id", getProfileById);
router.post("/api/completeprofile", auth, updateProfile);


router.post("/auth/sendotp", sendotp);
router.post("/auth/signup", signUp);
router.post("/auth/login", login);
router.post('/auth/logout', logout);



module.exports = router;
