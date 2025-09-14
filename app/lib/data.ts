// Paginated fetch for requests
export async function fetchRequestsPages(
  registeredCourse?: CourseCode,
  desiredCourse?: CourseCode,
  pageSize: number = 10
) {
  // Simulate total count for demo
  let data = sampleExchangeRequests;
  if (registeredCourse) {
    data = data.filter(r => r.registeredCourse === registeredCourse);
  }
  if (desiredCourse) {
    data = data.filter(r => r.desiredCourse === desiredCourse);
  }
  return Math.ceil(data.length / pageSize);
}
import postgres from 'postgres';
// Removed unused imports

import { ExchangeRequest, CourseCode, RequestStatus, Timeslot } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Sample data for exchange requests
export const sampleExchangeRequests: ExchangeRequest[] = [
  // ...existing 10 entries...
];

// Fetch all exchange requests
export async function fetchExchangeRequests(
  registeredCourse?: CourseCode,
  desiredCourse?: CourseCode,
  search?: string,
  registeredStart?: string | number,
  desiredStart?: string | number,
  registeredDay?: string,
  desiredDay?: string
): Promise<ExchangeRequest[]> {
  // Debug: print all incoming filter params
  console.log('fetchExchangeRequests params:', {
    registeredCourse,
    desiredCourse,
    search,
    registeredStart,
    desiredStart,
    registeredDay,
    desiredDay
  });
  // Build SQL WHERE clauses
  const clauses = [];
  const params: any[] = [];
  if (registeredCourse) {
    clauses.push('registered_course = $' + (params.length + 1));
    params.push(registeredCourse);
  }
  if (desiredCourse) {
    clauses.push('desired_course = $' + (params.length + 1));
    params.push(desiredCourse);
  }
  if (registeredDay) {
    clauses.push('registered_day = $' + (params.length + 1));
    params.push(registeredDay);
  }
  if (desiredDay) {
    clauses.push('desired_day = $' + (params.length + 1));
    params.push(desiredDay);
  }
  if (registeredStart) {
    clauses.push('registered_from = $' + (params.length + 1));
    params.push(registeredStart);
  }
  if (desiredStart) {
    clauses.push('desired_from = $' + (params.length + 1));
    params.push(desiredStart);
  }
  if (search) {
    const like = `%${search.toLowerCase()}%`;
    const idx = params.length + 1;
    clauses.push(`(
      LOWER(name) LIKE $${idx} OR
      LOWER(contact) LIKE $${idx} OR
      LOWER(registered_course) LIKE $${idx} OR
      LOWER(desired_course) LIKE $${idx} OR
      LOWER(registered_day) LIKE $${idx} OR
      LOWER(desired_day) LIKE $${idx} OR
      LOWER(registered_from) LIKE $${idx} OR
      LOWER(registered_to) LIKE $${idx} OR
      LOWER(desired_from) LIKE $${idx} OR
      LOWER(desired_to) LIKE $${idx} OR
      LOWER(status) LIKE $${idx}
    )`);
    params.push(like);
  }
  const where = clauses.length ? 'WHERE ' + clauses.join(' AND ') : '';
  const query = `SELECT * FROM exchange_requests ${where} ORDER BY name ASC`;
  console.log('SQL Query:', query, 'Params:', params);
  const rows = await sql.unsafe(query, params);
  // Map DB rows to ExchangeRequest shape
  return rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    contact: row.contact,
    registeredCourse: row.registered_course,
    desiredCourse: row.desired_course,
    registeredTimeslot: {
      day: row.registered_day,
      from: row.registered_from,
      to: row.registered_to,
    },
    desiredTimeslot: {
      day: row.desired_day,
      from: row.desired_from,
      to: row.desired_to,
    },
    status: row.status,
  }));
}

// Fetch a single request by id from the database
export async function fetchExchangeRequestById(id: string) {
  const rows = await sql`SELECT * FROM exchange_requests WHERE id = ${id} LIMIT 1`;
  if (!rows || rows.length === 0) return null;
  const row = rows[0];
  return {
    id: row.id,
    name: row.name,
    contact: row.contact,
    registeredCourse: row.registered_course,
    desiredCourse: row.desired_course,
    registeredTimeslot: {
      day: row.registered_day,
      from: row.registered_from,
      to: row.registered_to,
    },
    desiredTimeslot: {
      day: row.desired_day,
      from: row.desired_from,
      to: row.desired_to,
    },
    status: row.status,
  };
}

