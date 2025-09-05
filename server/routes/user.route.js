import express from "express"
import { forgotPassword, getUserProfile, login, logOut, register, resetPassword, updateProfile } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../utills/multer.js";

const router=express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logOut)
router.route("/profile").get(isAuthenticated,getUserProfile)
router.route("/profile/update").put(isAuthenticated,upload.single("profilePhoto"),updateProfile)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;