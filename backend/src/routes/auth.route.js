import express from 'express';

const router = express.Router();

router.get("/signup",(req,res)=>{
    res.send("Sign up end point ");
})
router.get("/login",(req,res)=>{
    res.send("login end point ");
})
router.get("/logout",(req,res)=>{
    res.send("log out end point ");
})

export default router;