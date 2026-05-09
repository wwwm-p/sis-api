export async function createAssessment(db, data) {
  const result = await db.query(
    `
    INSERT INTO assessments (
      school_id,
      student_id,
      counselor_id,
      reason,
      urgency,
      notes,
      is_crisis,
      created_at
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
    RETURNING *
    `,
    [
      data.schoolId,
      data.studentId,
      data.counselorId,
      data.reason,
      data.urgency,
      data.notes,
      data.isCrisis,
    ]
  );

  return result.rows[0];
}
