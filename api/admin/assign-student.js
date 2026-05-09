import { db } from "../../db/db";

export default async function handler(req, res) {
  const { studentId, counselorId } = req.body;

  await db.query(
    `UPDATE counselor_assignments
     SET active=false
     WHERE student_id=$1`,
    [studentId]
  );

  const result = await db.query(
    `INSERT INTO counselor_assignments
     (student_id, counselor_id, active)
     VALUES ($1,$2,true)
     RETURNING *`,
    [studentId, counselorId]
  );

  res.json(result.rows[0]);
}
