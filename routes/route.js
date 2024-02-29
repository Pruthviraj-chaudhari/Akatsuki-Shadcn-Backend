import { Router } from "express";
import { updateProfile } from "../controllers/update";
import { getAllData, getProfileById } from "../controllers/getAllData";
import { signUp, login, sendotp, logout } from "../controllers/auth";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/api/getData", getAllData);
router.get("/api/profiles/:id", getProfileById);
router.post("/api/completeprofile", auth, updateProfile);


router.post("/auth/sendotp", sendotp);
router.post("/auth/signup", signUp);
router.post("/auth/login", login);
router.post('/auth/logout', logout);



export default router;
