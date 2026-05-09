import { db } from "../../db/db";

export default async function handler(req, res) {
  const counselorId = req.query.counselorId;

  const assessments = await db.query(
    `SELECT * FROM assessments
     WHERE counselor_id=$1
     ORDER BY created_at DESC`,
    [counselorId]
  );

  res.json(assessments.rows);
}
