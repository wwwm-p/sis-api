import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  try {
    const { student_id } = req.query;

    if (!student_id) {
      return res.status(400).json({
        success: false,
        error: "Missing student_id"
      });
    }

    const student = await sql`
      SELECT *
      FROM students
      WHERE student_id = ${student_id}
      LIMIT 1
    `;

    if (student.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      student: student[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
