import jwt from 'jsonwebtoken'

const authenticationToken = (req,res,next) =>{
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "No token provided ",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decoded.userId; // Store user ID in request
    next();
  } catch (error) {
    return res.status(401).json({message:"Inavalid token"})
  }
}

export default  authenticationToken;