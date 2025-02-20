import { Company } from "../models/company.model.js";
export const registerCompnay = async (req, res) => {
  try {
    const { companyName, description, website } = req.body;
    if (!companyName  ) {
      return res.status(400).json({
        message: "Compnay name is required",
        success: false,
      });
    }
     if (!description) {
       return res.status(400).json({
         message: "description is required",
         success: false,
       });
     }
     if (!website) {
       return res.status(400).json({
         message: "wesite is required",
         success: false,
       });
     }
   let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false
      });
    }

    company = await Company.create({
      name: companyName,
      description,
      website,
      userId: req.id,
    });
    return res
      .status(201)
      .json({
        message: "Company created successfully",
        company,
        success: true,
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
      return res.status(404).json({ message: "No companies found" });
    }
  } catch (error) {
    console.error(error);
  }
};


// get company by id 
export const getCompanyById = async(req,res)=>{
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if(!company){
      return res.status(404).json({message: "Company is not found "})
    }
    return res.status(200).json({
      company,
      success: true
    })
  } catch (error) {
    console.error(error)
  }
}



// update compnay details
export const updateCompany = async(req,res)=>{
  try {
    const {name,description,website,location} = req.body
    const file = req.file
    // cloudinary

    const updateData = { name, description, website, location };

    const company = await Company.findById(req.params.id,updateData,{new: true})

if(!company){
  return res.status(404).json({message:"Company not found"})
}
return res.status(200).json({message:"Compnay updated "})
  } catch (error) {
    console.error(error)
  }

}