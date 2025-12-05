import jwt from "jsonwebtoken";

export const generateToken = (userId,res)=>{
    const {JWT_SECRET} =process.env;
    if(!JWT_SECRET){
        throw new Error("Jwt_secret is not found");
    }
    const token = jwt.sign({userId:userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
    });

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true ,//prevent xss attacks cross site scripting 
        sameSite:"Strict",//csrf attacks
       secure: process.env.NODE_ENV ==="development" ? false : true,
    });
    return token;
}