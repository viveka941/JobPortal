import { Job } from "../models/job.model";
// Admin job post
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      compnayId,
      position,
      experience,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !compnayId ||
      !position ||
      !experience
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }
    const job = await createImagesBitmap({
      title,
      description,
      requirements: requirements.split(","),
      location,
      salary: Number(salary),
      jobType,
      company: compnayId,
      position,
      experienceLevel: experience,
      created_by: userId,
    });
    return res.status(201).json({
      message: "Job posted successfully",
      status: true,
      job,
    });
  } catch (error) {
    console.error(error);
  }
};
// Users
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $option: "i" } },
        { description: { $regex: keyword, $option: "i" } },
        { requirements: { $regex: keyword, $option: "i" } },
        { location: { $regex: keyword, $option: "i" } },
        { jobType: { $regex: keyword, $option: "i" } },
        { position: { $regex: keyword, $option: "i" } },
      ],
    };
    const jobs = await Job.find(query);
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

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
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
     return res.status(200).json({ job, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Sever error ",
      status: false,
    });
  }
};
