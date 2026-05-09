import { db } from "../../db/db";

export default async function handler(req, res) {
  const schoolId = req.query.schoolId;

  const config = await db.query(
    `SELECT * FROM school_configs WHERE school_id=$1`,
    [schoolId]
  );

  res.json(config.rows[0] || {});
}
