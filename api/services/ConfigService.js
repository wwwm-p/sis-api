export async function getSchoolConfig(db, schoolId) {
  const result = await db.query(
    `
    SELECT config
    FROM school_configs
    WHERE school_id = $1
    `,
    [schoolId]
  );

  return result.rows[0]?.config || {};
}
