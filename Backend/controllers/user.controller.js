import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber,password, role } = req.body;
    if (!fullName || !email || !phoneNumber||!password || !role) {
      return res
        .status(404)
        .json({ message: "Missing required fiels", success: "false" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }
    // convert passowrd to hashes
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res.status(200).json({
      message: `Account created successfully for ${fullName}`,
      success: true,
      user: { fullName, email, phoneNumber, role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error register fields",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Incorrect eamil or password",
        success: false,
      });
    }
    // check role is correctly or not
    if (user.role != role) {
      return res.status(403).json({
        message: " You don't have the necessary role to access this resource",
        success: false,
      });
    }
    //generate toke data
    const tokenData = {
      userId: user._id,
    };
    const token =  jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcom back ${user.fullName}`,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: " Sever Error login fields ",
      success: false,
    });
  }
};

export const logout = (req,res)=>{
  try{
    return res.status(200).cookie("token","", {maxAge:0}).json({
      message:"Logged out successfull",
      success : true,
    })
  }catch(error){
    console.error(500).json({
      message: "Sever Error logout fields",
      success: false,
    });
  }
}


export const updateProfile = async(req,res)=>{

  try{
    const {fullName, email, phoneNumber, bio, skills} = req.body
    if(!fullName ||! email||! phoneNumber ||! bio||! skills){
      const file = req.file;
      return res.status(404).json({
        message:"Missing required fields",
        success : false
      })
    }

    // cloudinary uploads
    const skillsArray = skills.split(',')
    const userId = req.id// middleware authentication
    let user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        message: "User not found",
        success: false
      })
    }
    user.fullName = fullName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.bio = bio;
    user.skills = skillsArray

    await user.save();
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
     return res.status(200).json({
       message: "Profile updated successfully",
       user,
       success: false,
     });

  }catch(error){
    console.error(error)
    res.status(500).json({
      message: "Sever error updationg profile "
      ,success: false
    })
  }
}