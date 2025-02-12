import { Company } from "../models/compnay.model.js";
export const registerCompnay = async (req, res) => {
  try {
    const { company } = req.body;
    if (!companyName) {
      return res.status(400).json({ message: "compnay name is required" });
    }
    let compnay = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({ message: "Compnay already exists" });
    }
    company = await Company.create({
      name: companyName,
      userId: req.user.id,
    });
    return res.status(201).json({
      message: "Compnay created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({ message: "No companies found " });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //cloudinary
    // const fileUri = getDataUri(file);
    // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    // const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ message: "Company updated" });
  } catch (error) {
    console.error(error);
  }
};