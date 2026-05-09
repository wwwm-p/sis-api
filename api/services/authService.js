// services/authService.js
import jwt from "jsonwebtoken";

export function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      school_id: user.school_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  if (!token) throw new Error("No token provided");

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }
}
