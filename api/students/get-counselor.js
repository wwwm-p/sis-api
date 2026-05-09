import { db } from "../../db/db";

export default async function handler(req, res) {
  const studentId = req.query.studentId;

  const result = await db.query(
    `SELECT c.*
     FROM counselor_assignments ca
     JOIN counselors c ON c.id = ca.counselor_id
     WHERE ca.student_id = $1 AND ca.active = true`,
    [studentId]
  );

  res.json(result.rows[0]);
}
