import { Job } from "../models/job.model.js";
// Admin job post
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    res.status(201).json({
      message: "Job posted successfully.",
      job,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};

// Users
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", status: false });
    }
    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:"applications"
    });
    if (!job) {
      return res.status(404).json({
        message: "No jobs found",
        status: false,
      });
    }
    return res.status(200).json({ job, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Sever error ",
      status: false,
    });
  }
};

// Admin job created
export const getAdminJob = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        status: false,
      });
    }
     return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Sever error ",
      status: false,
    });
  }
};


export const deleteJob = async(req,res)=>{
  try {
      const {jobId} = req.params;
      if(!jobId){
        return res.status(400).json({
          message:"not find Job",
          success:"false"
        })
      }
      
      const deletedJob = await Job.findByIdAndDelete( jobId );
      if (!deletedJob) {
        return res.status(404).json({
          message: "Job not found",
          success: false,
        });
      }
       return res.status(200).json({
        message :"successfull deleted job",
        success:true
       })

  } catch (error) {
     console.error(error);
     return res.status(500).json({
       message: "Sever error ",
       status: false,
     });
  }
}
