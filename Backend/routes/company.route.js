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

router.route("/register").post(registerCompnay);
router.route("/get").get(getAllCompanies)
router.route("/get/:id").get(getCompanyById);
router
  .route("/update/:id")
  .put( singleUpload, updateCompany);

export default router;
