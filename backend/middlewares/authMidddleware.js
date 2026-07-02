import JWT from "jsonwebtoken"
import userModel from "../models/usermodel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Authorization token malformed" });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: "Invalid or expired token" });
  }
};

export const isAdmin=async(req,res,next)=>{
    try {
      const user=await userModel.findById(req.user._id);
      if(user.role!=="admin"){
        return res.status(401).send({
            success:false,
            message:"Unauthorized access"
        })
      }
      else{
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success:false,
        message:"Error in middleware",
        error,
      })
      
    }
  }
