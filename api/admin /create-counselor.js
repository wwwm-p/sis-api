import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  try {
    // Only allow POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Parse body
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        error: "Missing name or email"
      });
    }

    // Insert into database
    const result = await sql`
      INSERT INTO counselors (name, email)
      VALUES (${name}, ${email})
      RETURNING *
    `;

    // Success response
    return res.status(200).json({
      success: true,
      counselor: result[0]
    });

  } catch (error) {
    console.error("CREATE COUNSELOR ERROR:", error);

    return res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
}
