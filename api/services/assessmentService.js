// services/assessmentService.js

export async function createAssessment(db, data) {
  const {
    studentId,
    counselorId,
    reason,
    urgency,
  } = data;

  const isCrisis = urgency === "crisis";

  const result = await db.query(
    `
    INSERT INTO assessments
    (student_id, counselor_id, reason, urgency, crisis)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [studentId, counselorId, reason, urgency, isCrisis]
  );

  return result.rows[0];
}

export async function getAssessmentsForCounselor(db, counselorId) {
  const result = await db.query(
    `
    SELECT *
    FROM assessments
    WHERE counselor_id = $1
    ORDER BY created_at DESC
    `,
    [counselorId]
  );

  return result.rows;
}

export async function getAssessmentsForStudent(db, studentId) {
  const result = await db.query(
    `
    SELECT *
    FROM assessments
    WHERE student_id = $1
    ORDER BY created_at DESC
    `,
    [studentId]
  );

  return result.rows;
}
