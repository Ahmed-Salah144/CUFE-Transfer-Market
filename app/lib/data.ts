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
  {
    id: '11', name: 'Liam Smith', contact: 'liam.smith@example.com', registeredCourse: CourseCode.MATH101, desiredCourse: CourseCode.PHYS202, registeredTimeslot: { day: 'Wed', from: '8am', to: '9am' }, desiredTimeslot: { day: 'Thu', from: '10am', to: '11am' }, status: RequestStatus.Pending,
  },
  {
    id: '12', name: 'Mia Brown', contact: 'mia.brown@example.com', registeredCourse: CourseCode.CS404, desiredCourse: CourseCode.CHEM303, registeredTimeslot: { day: 'Mon', from: '9am', to: '10am' }, desiredTimeslot: { day: 'Tue', from: '11am', to: '12pm' }, status: RequestStatus.Completed,
  },
  {
    id: '13', name: 'Noah Lee', contact: 'noah.lee@example.com', registeredCourse: CourseCode.BIO505, desiredCourse: CourseCode.MATH101, registeredTimeslot: { day: 'Fri', from: '10am', to: '11am' }, desiredTimeslot: { day: 'Wed', from: '12pm', to: '1pm' }, status: RequestStatus.Pending,
  },
  {
    id: '14', name: 'Olivia Green', contact: 'olivia.green@example.com', registeredCourse: CourseCode.PHYS202, desiredCourse: CourseCode.CS404, registeredTimeslot: { day: 'Thu', from: '11am', to: '12pm' }, desiredTimeslot: { day: 'Mon', from: '1pm', to: '2pm' }, status: RequestStatus.Pending,
  },
  {
    id: '15', name: 'Paul White', contact: 'paul.white@example.com', registeredCourse: CourseCode.CHEM303, desiredCourse: CourseCode.BIO505, registeredTimeslot: { day: 'Tue', from: '12pm', to: '1pm' }, desiredTimeslot: { day: 'Fri', from: '2pm', to: '3pm' }, status: RequestStatus.Pending,
  },
  {
    id: '16', name: 'Quinn Black', contact: 'quinn.black@example.com', registeredCourse: CourseCode.MATH101, desiredCourse: CourseCode.CHEM303, registeredTimeslot: { day: 'Wed', from: '1pm', to: '2pm' }, desiredTimeslot: { day: 'Thu', from: '3pm', to: '4pm' }, status: RequestStatus.Completed,
  },
  {
    id: '17', name: 'Ruby Lin', contact: 'ruby.lin@example.com', registeredCourse: CourseCode.PHYS202, desiredCourse: CourseCode.MATH101, registeredTimeslot: { day: 'Mon', from: '2pm', to: '3pm' }, desiredTimeslot: { day: 'Tue', from: '4pm', to: '5pm' }, status: RequestStatus.Pending,
  },
  {
    id: '18', name: 'Sam Ford', contact: 'sam.ford@example.com', registeredCourse: CourseCode.CS404, desiredCourse: CourseCode.PHYS202, registeredTimeslot: { day: 'Fri', from: '3pm', to: '4pm' }, desiredTimeslot: { day: 'Wed', from: '8am', to: '9am' }, status: RequestStatus.Pending,
  },
  {
    id: '19', name: 'Tina Chen', contact: 'tina.chen@example.com', registeredCourse: CourseCode.BIO505, desiredCourse: CourseCode.CS404, registeredTimeslot: { day: 'Thu', from: '4pm', to: '5pm' }, desiredTimeslot: { day: 'Mon', from: '9am', to: '10am' }, status: RequestStatus.Completed,
  },
  {
    id: '20', name: 'Uma Black', contact: 'uma.black@example.com', registeredCourse: CourseCode.CHEM303, desiredCourse: CourseCode.PHYS202, registeredTimeslot: { day: 'Tue', from: '5pm', to: '6pm' }, desiredTimeslot: { day: 'Fri', from: '10am', to: '11am' }, status: RequestStatus.Pending,
  },
  {
    id: '21', name: 'Victor Stone', contact: 'victor.stone@example.com', registeredCourse: CourseCode.PHYS202, desiredCourse: CourseCode.CS404, registeredTimeslot: { day: 'Wed', from: '6pm', to: '7pm' }, desiredTimeslot: { day: 'Thu', from: '8am', to: '9am' }, status: RequestStatus.Pending,
  },
  {
    id: '22', name: 'Wendy Park', contact: 'wendy.park@example.com', registeredCourse: CourseCode.BIO505, desiredCourse: CourseCode.CHEM303, registeredTimeslot: { day: 'Mon', from: '7pm', to: '8pm' }, desiredTimeslot: { day: 'Tue', from: '9am', to: '10am' }, status: RequestStatus.Completed,
  },
  {
    id: '23', name: 'Xander Cruz', contact: 'xander.cruz@example.com', registeredCourse: CourseCode.CS404, desiredCourse: CourseCode.MATH101, registeredTimeslot: { day: 'Fri', from: '8am', to: '9am' }, desiredTimeslot: { day: 'Wed', from: '11am', to: '12pm' }, status: RequestStatus.Pending,
  },
  {
    id: '24', name: 'Yara Patel', contact: 'yara.patel@example.com', registeredCourse: CourseCode.MATH101, desiredCourse: CourseCode.BIO505, registeredTimeslot: { day: 'Thu', from: '9am', to: '10am' }, desiredTimeslot: { day: 'Mon', from: '12pm', to: '1pm' }, status: RequestStatus.Pending,
  },
  {
    id: '25', name: 'Zane Kim', contact: 'zane.kim@example.com', registeredCourse: CourseCode.CHEM303, desiredCourse: CourseCode.PHYS202, registeredTimeslot: { day: 'Tue', from: '10am', to: '11am' }, desiredTimeslot: { day: 'Fri', from: '1pm', to: '2pm' }, status: RequestStatus.Completed,
  },
  {
    id: '26', name: 'Ava Lee', contact: 'ava.lee@example.com', registeredCourse: CourseCode.PHYS202, desiredCourse: CourseCode.CS404, registeredTimeslot: { day: 'Wed', from: '11am', to: '12pm' }, desiredTimeslot: { day: 'Thu', from: '2pm', to: '3pm' }, status: RequestStatus.Pending,
  },
  {
    id: '27', name: 'Ben Fox', contact: 'ben.fox@example.com', registeredCourse: CourseCode.BIO505, desiredCourse: CourseCode.MATH101, registeredTimeslot: { day: 'Mon', from: '12pm', to: '1pm' }, desiredTimeslot: { day: 'Tue', from: '3pm', to: '4pm' }, status: RequestStatus.Pending,
  },
  {
    id: '28', name: 'Cara Moon', contact: 'cara.moon@example.com', registeredCourse: CourseCode.CS404, desiredCourse: CourseCode.CHEM303, registeredTimeslot: { day: 'Fri', from: '1pm', to: '2pm' }, desiredTimeslot: { day: 'Wed', from: '4pm', to: '5pm' }, status: RequestStatus.Completed,
  },
  {
    id: '29', name: 'Derek Wolf', contact: 'derek.wolf@example.com', registeredCourse: CourseCode.MATH101, desiredCourse: CourseCode.PHYS202, registeredTimeslot: { day: 'Thu', from: '2pm', to: '3pm' }, desiredTimeslot: { day: 'Mon', from: '5pm', to: '6pm' }, status: RequestStatus.Pending,
  },
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
  const rows = await sql.unsafe(query, ...params);
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

