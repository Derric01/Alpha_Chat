import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {ENV} from "../lib/env.js";
export const protectRoute = async (req,res,next)=>{
    // Middleware logic to protect routes
 try {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({message:"not authorized,no token"});

    const decoded = jwt.verify(token,ENV.JWT_SECRET);
    if(!decoded) return res.status(401).json({message:"not authorized,token failed to verify"});
    const user = await User.findById(decoded.id).select("-password");
    if(!user) return res.status(401).json({message:"the user belonging to this token does no longer exist!"});

    req.user = user;
    next();
 } catch (error) {
    console.log("Error in protectRoute middleware:", error);
    return res.status(500).json({message:"server error in authentication middleware"});
 }   
}

