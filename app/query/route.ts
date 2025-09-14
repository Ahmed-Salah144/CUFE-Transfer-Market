export async function DELETE() {
   try {
      await sql`DELETE FROM exchange_requests`;
      return Response.json({ message: 'All requests deleted.' });
   } catch (error) {
      return Response.json({ error }, { status: 500 });
   }
}
import postgres from 'postgres';
import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listRequests() {
   const data = await sql`SELECT * FROM exchange_requests ORDER BY name ASC`;
   return data;
}

export async function GET() {
   try {
      //return Response.json(await listRequests());
      return Response.json(await listRequests());
   } catch (error) {
      return Response.json({ error }, { status: 500 });
   }
}
