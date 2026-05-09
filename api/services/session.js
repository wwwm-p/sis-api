import jwt from "jsonwebtoken";

export function createSession(user) {
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

export function parseSession(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
