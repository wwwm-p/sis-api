import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {

  // Simple GET test
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "create-student endpoint is working"
    });
  }

  // Only allow POST beyond this point
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {

    const {
      first_name,
      last_name,
      sis_student_id,
      counselor_id
    } = req.body;

    // Validation
    if (!first_name || !last_name || !sis_student_id) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    // Insert student
    const result = await sql`
      INSERT INTO students (
        first_name,
        last_name,
        sis_student_id,
        counselor_id
      )
      VALUES (
        ${first_name},
        ${last_name},
        ${sis_student_id},
        ${counselor_id}
      )
      RETURNING *
    `;

    return res.status(200).json({
      success: true,
      student: result[0]
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
