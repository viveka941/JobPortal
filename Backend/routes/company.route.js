import express from "express";
import authenticationToken from "../middleware/isAuthenticated.js";
import {
  getAllCompanies,
  getCompanyById,
  registerCompnay,
  updateCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(authenticationToken,registerCompnay);
router.route("/get").get(authenticationToken,getAllCompanies)
router.route("/get/:id").get(authenticationToken,getCompanyById);
router
  .route("/update/:id")
  .put(authenticationToken, singleUpload, updateCompany);

export default router;
