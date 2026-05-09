export async function getAssignedCounselor(
  db,
  studentId,
  schoolId
) {
  const result = await db.query(
    `
    SELECT c.*
    FROM counselor_assignments ca
    JOIN counselors c
      ON c.id = ca.counselor_id
    WHERE ca.student_id = $1
      AND ca.school_id = $2
      AND ca.active = true
    LIMIT 1
    `,
    [studentId, schoolId]
  );

  return result.rows[0];
}
