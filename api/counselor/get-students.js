import { db } from "../../db/db";

export default async function handler(req, res) {
  const counselorId = req.query.counselorId;

  const students = await db.query(
    `SELECT s.*
     FROM counselor_assignments ca
     JOIN students s ON s.id = ca.student_id
     WHERE ca.counselor_id = $1 AND ca.active = true`,
    [counselorId]
  );

  res.json(students.rows);
}
