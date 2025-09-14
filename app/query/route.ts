export async function DELETE() {
   return new Response('Not Found', { status: 404 });
}
import postgres from 'postgres';
import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listRequests() {
   const data = await sql`SELECT * FROM exchange_requests ORDER BY name ASC`;
   return data;
}

export async function GET() {
   return new Response('Not Found', { status: 404 });
}
