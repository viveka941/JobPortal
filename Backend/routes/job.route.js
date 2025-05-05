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

router.route("/post").post( postJob);
router.route("/get").get( getAllJobs);
router.route("/getadminjobs").get( getAdminJob);
router.route("/get/:id").get( getJobById);
router.route("/deleteJob/:id").delete(deleteJob);

export default router;
