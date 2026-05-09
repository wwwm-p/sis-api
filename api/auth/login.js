import jwt from "jsonwebtoken";
import { db } from "../../db/db";

export default async function handler(req, res) {
  const { email, password } = req.body;

  const user = await db.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!user.rows[0]) {
    return res.status(401).json({ error: "Invalid login" });
  }

  const token = jwt.sign(
    {
      id: user.rows[0].id,
      role: user.rows[0].role,
      school_id: user.rows[0].school_id
    },
    process.env.JWT_SECRET
  );

  res.json({ token });
}
