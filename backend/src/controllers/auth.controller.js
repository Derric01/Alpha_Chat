import User from "../models/User.js";
import bcrypt from "bcryptjs";

import { generateToken  } from "../lib/utils.js";
export const signup = async (req,res) =>{
    const {fullName,email,password} = req.body

    try{
  if(!fullName || !email || !password){
    return res.status(400).json({message:"All fields are required"})
  }
  if(password.length<6){
    return res.status(400).json({message:"please the password  should atleast be 6 characters"});
  }
//email check regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
  return res.status(400).json({message:"invalid email"});
  }


  const user = await User.findOne({email});
  if(user){
    return res.status(400).json({message:"The Email already exists"})
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt)



  const newUser = new User({
    fullName,
    email,
    password:hashedPassword,
  });
  if(newUser){
  generateToken(newUser._id,res)
  await newUser.save();

  res.status(201).json({
    _id:newUser.fullName,
    email: newUser.email,
    profilePic:newUser.profilePic,
    

  });
  }else{
    res.status(400).json({message:"Invalid user in data "})
  }
    }catch(error){
console.log("Error in the server!!",error);
res.status(500).json({message:"there is some error"});
    }
}