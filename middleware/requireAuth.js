import jwt from "jsonwebtoken";

export async function requireAuth(req) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new Error("No token");

  const user = jwt.verify(token, process.env.JWT_SECRET);

  req.user = user;
  return user;
}
