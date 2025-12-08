// ...existing code...
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "please the password should atleast be 6 characters" });
    }

    // email check regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "invalid email" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "The Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save user once
    const savedUser = await newUser.save();
    
    // Generate token
    generateToken(savedUser._id, res);

    // Send welcome email (non-blocking)
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    sendWelcomeEmail(savedUser.email, savedUser.fullName, clientUrl).catch((error) => {
      console.log("Failed to send the email:", error);
    });

    // Send response
    return res.status(201).json({
      _id: savedUser._id,        // Fix: use _id not fullName
      fullName: savedUser.fullName,
      email: savedUser.email,
      profilePic: savedUser.profilePic,
    });

  } catch (error) {
    console.log("Error in signup:", error);
    return res.status(500).json({ message: "there is some error" });
  }
};
export const login = async (req,res) =>{
  // Login functionality to be implemented
  const {email,password}  = req.body; // Destructure email and password from request body
  try{
    if(!email || ! password) {
      return res.status(400).json({message:"All the fields are required "});// Check if email and password are provided
    }
    const user = await User.findOne({email});// Find user by email
    if(!user){
      return res.status(400).json({message:"User does not exist"});// If user not found, return error

    }
    const isMatch = await bcrypt.compare(password,user.password);// Compare provided password with stored hashed password
    if(!isMatch){
      return res.status(400).json({message: 
        "Invalid credentials"});// If password does not match, return error

    }
    generateToken(user._id,res);// Generate token for authenticated user
    return res.status(200).json({
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      profilePic:user.profilePic,
    })// Return user details in response
  }catch(error){
    console.log("Error in login:",error);
    return res.status(500).json({message:"server error"})
  }
} 


export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};