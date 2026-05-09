export async function getCounselorStudents(db, counselorId, schoolId) {
  const result = await db.query(
    `SELECT s.*
     FROM students s
     JOIN counselor_assignments ca ON ca.student_id = s.id
     WHERE ca.counselor_id = $1
       AND s.school_id = $2
       AND ca.active = true`,
    [counselorId, schoolId]
  );

  return result.rows;
}

export async function getCounselorAssessments(db, counselorId, schoolId) {
  const result = await db.query(
    `SELECT *
     FROM assessments
     WHERE counselor_id = $1
       AND school_id = $2
     ORDER BY created_at DESC`,
    [counselorId, schoolId]
  );

  return result.rows;
}
