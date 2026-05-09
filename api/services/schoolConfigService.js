// services/schoolConfigService.js

export async function getSchoolConfig(db, schoolId) {
  const result = await db.query(
    `
    SELECT *
    FROM school_configs
    WHERE school_id = $1
    `,
    [schoolId]
  );

  return result.rows[0] || null;
}

export async function updateSchoolConfig(db, schoolId, config) {
  const result = await db.query(
    `
    INSERT INTO school_configs (school_id, config)
    VALUES ($1, $2)
    ON CONFLICT (school_id)
    DO UPDATE SET config = $2
    RETURNING *
    `,
    [schoolId, config]
  );

  return result.rows[0];
}
