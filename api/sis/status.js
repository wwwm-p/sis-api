import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  try {
    const result = await sql`
      SELECT *
      FROM sync_status
      ORDER BY last_sync DESC
      LIMIT 1
    `;

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        status: "No syncs yet"
      });
    }

    res.status(200).json({
      success: true,
      sync: result[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
