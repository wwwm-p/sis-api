// services/assignmentService.js

export async function getCounselorForStudent(db, studentId) {
  const result = await db.query(
    `
    SELECT counselor_id
    FROM counselor_assignments
    WHERE student_id = $1 AND active = true
    LIMIT 1
    `,
    [studentId]
  );

  return result.rows[0] || null;
}

export async function assignStudentToCounselor(db, studentId, counselorId) {
  // deactivate old assignment
  await db.query(
    `
    UPDATE counselor_assignments
    SET active = false
    WHERE student_id = $1
    `,
    [studentId]
  );

  // create new assignment
  const result = await db.query(
    `
    INSERT INTO counselor_assignments
    (student_id, counselor_id, active)
    VALUES ($1, $2, true)
    RETURNING *
    `,
    [studentId, counselorId]
  );

  return result.rows[0];
}
