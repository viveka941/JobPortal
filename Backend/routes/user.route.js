import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import authenticationToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import { getUserdata, userDetailsData } from "../controllers/userDetails.controller.js";
const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").post(authenticationToken,singleUpload, updateProfile);
router.route("/addDetails/:id").post(userDetailsData);
router.route("/userDetails/:id").get(getUserdata);

export default router;
