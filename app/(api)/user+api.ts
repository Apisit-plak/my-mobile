import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, password } = await request.json();

    if (!firstName || !lastName || !email || !phone || !password) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    const client = await pool.connect();
    const query = `
      INSERT INTO users (firstName, lastName, email, phone, password)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [firstName, lastName, email, phone, password];
    const result = await client.query(query, values);
    client.release();

    return new Response(JSON.stringify({ data: result.rows[0] }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
