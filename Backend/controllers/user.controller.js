import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, role } = req.body;
    if (!fullname || !email || !phoneNumber || !role) {
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
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
    });
  } catch {
    error;
  }
  {
  }
};
