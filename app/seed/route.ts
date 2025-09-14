import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { sampleExchangeRequests } from '@/app/lib/placeholder-data';
async function seedExchangeRequests() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS exchange_requests (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      contact VARCHAR(255) NOT NULL,
      registered_course VARCHAR(255),
      desired_course VARCHAR(255) NOT NULL,
      registered_day VARCHAR(20),
      registered_from VARCHAR(20),
      registered_to VARCHAR(20),
      desired_day VARCHAR(20) NOT NULL,
      desired_from VARCHAR(20) NOT NULL,
      desired_to VARCHAR(20) NOT NULL,
      status VARCHAR(50)
    );
  `;

  function isValidUUID(uuid: string) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
  }
  const insertedRequests = await Promise.all(
    sampleExchangeRequests.map((req) => {
      if (req.id && isValidUUID(req.id)) {
        return sql`
          INSERT INTO exchange_requests (
            id, name, contact, registered_course, desired_course,
            registered_day, registered_from, registered_to,
            desired_day, desired_from, desired_to, status
          ) VALUES (
            ${req.id}, ${req.name}, ${req.contact}, ${req.registeredCourse ?? ''}, ${req.desiredCourse},
            ${req.registeredTimeslot?.day ?? ''}, ${req.registeredTimeslot?.from ?? ''}, ${req.registeredTimeslot?.to ?? ''},
            ${req.desiredTimeslot?.day ?? ''}, ${req.desiredTimeslot?.from ?? ''}, ${req.desiredTimeslot?.to ?? ''},
            ${req.status ?? ''}
          )
          ON CONFLICT (id) DO NOTHING;
        `;
      } else {
        return sql`
          INSERT INTO exchange_requests (
            name, contact, registered_course, desired_course,
            registered_day, registered_from, registered_to,
            desired_day, desired_from, desired_to, status
          ) VALUES (
            ${req.name}, ${req.contact}, ${req.registeredCourse ?? ''}, ${req.desiredCourse},
            ${req.registeredTimeslot?.day ?? ''}, ${req.registeredTimeslot?.from ?? ''}, ${req.registeredTimeslot?.to ?? ''},
            ${req.desiredTimeslot?.day ?? ''}, ${req.desiredTimeslot?.from ?? ''}, ${req.desiredTimeslot?.to ?? ''},
            ${req.status ?? ''}
          );
        `;
      }
    })
  );
  return insertedRequests;
}

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


export async function GET() {
  try {
    await seedExchangeRequests();
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
