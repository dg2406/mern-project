import mongoose from "mongoose";
import { type } from "os";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    question:{
        type:String,
        required:true,
    },
    role: {       
        type: String,
       
      },


},{timestamps:true});
const userModel= mongoose.model('users',userSchema);
export default userModel;