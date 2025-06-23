import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import ApiError from "../utils/ApiError.js";

const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("[AUTH] Token from cookie:", token); // Debugging line
  if (!token) {
    console.log("[AUTH] No token found in cookies");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Exclude password
    console.log("[AUTH] Authenticated user:", req.user ? req.user.email : null, "Role:", req.user ? req.user.role : null);
    next();
  } catch (error) {
    console.log("[AUTH] Invalid token");
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    console.log("[AUTH] User is admin, access granted");
    next();
  } else {
    console.log("[AUTH] Forbidden: User is not admin", req.user ? req.user.role : null);
    res.status(403).json({ message: "Forbidden: Admins only" });
  }
};

export { authenticate, authorizeAdmin };
