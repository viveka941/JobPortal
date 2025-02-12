import express from "express";
import {
  login,
  register,
  updateProfile,
  logout,
} from "../controller/user.controller.js";
import authenticateToken from "../middleware/isAuthenticate.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(authenticateToken, logout);
router.route("/profile/update").put(authenticateToken, updateProfile);

export default router;
