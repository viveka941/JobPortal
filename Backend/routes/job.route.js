import express from "express";
import authenticationToken from "../middleware/isAuthenticated.js";
import {
  deleteJob,
  getAdminJob,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";
const router = express.Router();

router.route("/post").post(authenticationToken, postJob);
router.route("/get").get(authenticationToken, getAllJobs);
router.route("/getadminjobs").get(authenticationToken, getAdminJob);
router.route("/get/:id").get(authenticationToken, getJobById);
router.route("/deleteJob/:id").delete(deleteJob)

export default router;
