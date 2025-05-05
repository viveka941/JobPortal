import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import authenticationToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import {
  getUserDetails,
  updateUserDetails,
  userDetailsData,
} from "../controllers/userDetails.controller.js";
import { allFeedback, feedback } from "../controllers/FeedBack.controller.js";
const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router
  .route("/profile/update")
  .post( singleUpload, updateProfile);
router.route("/addDetails/:id").post(userDetailsData);
router.route("/getUserDetails/:id").get(getUserDetails);
router.route("/updateDetails/:id").put(updateUserDetails);
router.route("/feedback").post(feedback);
router.route("/allfeedback").get( allFeedback);

export default router;
