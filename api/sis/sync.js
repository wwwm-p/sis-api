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

    // Placeholder SIS sync logic
    // Replace later with real SIS API fetches

    const syncedAt = new Date().toISOString();

    await sql`
      INSERT INTO sync_status (
        status,
        last_sync,
        records_updated
      )
      VALUES (
        'completed',
        ${syncedAt},
        0
      )
    `;

    res.status(200).json({
      success: true,
      message: "SIS sync completed",
      syncedAt
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
