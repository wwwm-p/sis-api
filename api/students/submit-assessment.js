import { db } from "../../db/db";

export default async function handler(req, res) {
  const { studentId, reason, urgency } = req.body;

  // 1. get counselor
  const counselor = await db.query(
    `SELECT counselor_id FROM counselor_assignments
     WHERE student_id=$1 AND active=true`,
    [studentId]
  );

  const counselorId = counselor.rows[0].counselor_id;

  // 2. check crisis
  const isCrisis = urgency === "crisis";

  // 3. insert assessment
  const assessment = await db.query(
    `INSERT INTO assessments
     (student_id, counselor_id, reason, urgency, crisis)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [studentId, counselorId, reason, urgency, isCrisis]
  );

  // 4. return result
  res.json(assessment.rows[0]);
}
