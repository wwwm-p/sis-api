import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

// helper to safely parse body in Vercel
function parseBody(req) {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body || {};
}

export default async function handler(req, res) {

  try {
    // allow test in browser
    if (req.method === "GET") {
      return res.status(200).json({
        success: true,
        message: "create-student endpoint is alive"
      });
    }

    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        error: "Method not allowed"
      });
    }

    const body = parseBody(req);

    const {
      school_id,
      first_name,
      last_name,
      sis_student_id,
      counselor_id
    } = body;

    // validate
    if (!first_name || !last_name || !sis_student_id) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    // auto fallback school (prevents crash)
    let finalSchoolId = school_id;

    if (!finalSchoolId) {
      const school = await sql`
        SELECT id FROM schools LIMIT 1
      `;

      if (!school.length) {
        return res.status(400).json({
          success: false,
          error: "No school found in database"
        });
      }

      finalSchoolId = school[0].id;
    }

    const result = await sql`
      INSERT INTO students (
        school_id,
        first_name,
        last_name,
        sis_student_id,
        counselor_id
      )
      VALUES (
        ${finalSchoolId},
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

  } catch (err) {
    console.error("CREATE STUDENT ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
