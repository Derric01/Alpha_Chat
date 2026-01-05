import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("not authorized, no token"));

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) return next(new Error("not authorized, token failed to verify"));

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return next(new Error("the user belonging to this token does no longer exist!"));

    socket.user = user;
    socket.userId = user._id;
    next();
  } catch (error) {
    console.log("Error in socketAuthMiddleware:", error);
    next(new Error("server error in socket authentication middleware"));
  }
};