import { db } from "../../db/db";

export default async function handler(req, res) {
  const userId = req.headers["x-user-id"];
  const schoolId = req.headers["x-school-id"];

  const user = await db.query(
    "SELECT id, role, school_id FROM users WHERE id=$1",
    [userId]
  );

  const school = await db.query(
    "SELECT * FROM schools WHERE id=$1",
    [schoolId]
  );

  const config = await db.query(
    "SELECT * FROM school_configs WHERE school_id=$1",
    [schoolId]
  );

  res.json({
    user: user.rows[0],
    school: school.rows[0],
    config: config.rows[0] || {}
  });
}
