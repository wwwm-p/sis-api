import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {
    const {
      student_id,
      first_name,
      last_name,
      grade,
      counselor_id
    } = req.body;

    if (!student_id || !first_name || !last_name) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    await sql`
      INSERT INTO students (
        student_id,
        first_name,
        last_name,
        grade,
        counselor_id
      )
      VALUES (
        ${student_id},
        ${first_name},
        ${last_name},
        ${grade},
        ${counselor_id}
      )
      ON CONFLICT (student_id)
      DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        grade = EXCLUDED.grade,
        counselor_id = EXCLUDED.counselor_id
    `;

    res.status(200).json({
      success: true,
      message: "Student created/updated"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
