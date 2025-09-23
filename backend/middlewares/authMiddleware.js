const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  console.log("Auth middleware called for:", req.path);
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decoded successfully for user:", decoded.id);
        const user = await User.findById(decoded?.id);
        if (!user) {
          throw new Error("User not found");
        }
        req.user = user;
        console.log("User authenticated:", user.email);
        next();
      }
    } catch (error) {
      console.error("Auth middleware error:", error.message);
      throw new Error("Not Authorized token expired,Please Login again");
    }
  } else {
    console.log("No authorization header found");
    throw new Error("THere is no token attached to header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  console.log("isAdmin middleware called");
  const { email } = req.user;
  const adminUser = await User.findOne({ email });

  console.log("Admin user found:", adminUser ? adminUser.email : "Not found");
  console.log("User role:", adminUser ? adminUser.role : "No role");

  if (adminUser.role !== "admin") {
    throw new Error("Your are not an admin");
  } else {
    console.log("Admin access granted");
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
