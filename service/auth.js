const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const API_KEY = process.env.AUTH_SECRET_KEY;

function generateTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  return jwt.sign(payload, API_KEY);
}

function validateTokenForUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, API_KEY);
  } catch (error) {
    return null;
  }
}

module.exports = { generateTokenForUser, validateTokenForUser };
