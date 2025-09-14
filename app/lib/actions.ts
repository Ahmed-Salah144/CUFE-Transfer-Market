
'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { redirect } from 'next/navigation';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const RequestSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  contact: z.string().min(1, 'Contact info is required'),
  registeredCourse: z.string().optional(),
  desiredCourse: z.string().min(1, 'Desired course is required'),
  registeredDay: z.string().optional(),
  registeredFrom: z.string().optional(),
  registeredTo: z.string().optional(),
  desiredDay: z.string().min(1, 'Desired day is required'),
  desiredFrom: z.string().min(1, 'Desired start time is required'),
  desiredTo: z.string().min(1, 'Desired end time is required'),
  status: z.string().optional(),
});

export type RequestFormState = {
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

export async function createExchangeRequest(prevState: RequestFormState, formData: FormData) {
  const validatedFields = RequestSchema.safeParse({
    name: formData.get('name'),
    contact: formData.get('contact'),
    registeredCourse: formData.get('registeredCourse'),
    desiredCourse: formData.get('desiredCourse'),
    registeredDay: formData.get('registeredDay'),
    registeredFrom: formData.get('registeredFrom'),
    registeredTo: formData.get('registeredTo'),
    desiredDay: formData.get('desiredDay'),
    desiredFrom: formData.get('desiredFrom'),
    desiredTo: formData.get('desiredTo'),
     status: formData.get('status') || 'Pending',
  });
  // Debugging: print all formData entries
  const debugData: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    debugData[key] = value;
  }
  console.log('createExchangeRequest called with formData:', debugData);
  console.log('validatedFields:', validatedFields);
  if (!validatedFields.success) {
    console.log('Validation failed:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create request.',
    };
  }
  // Example DB logic (replace with your own table/fields)
  const {
    name, contact, registeredCourse, desiredCourse,
    registeredDay, registeredFrom, registeredTo,
    desiredDay, desiredFrom, desiredTo, status
  } = validatedFields.data;
  try {
    const result = await sql`
      INSERT INTO exchange_requests (
        name, contact, registered_course, desired_course,
        registered_day, registered_from, registered_to,
        desired_day, desired_from, desired_to, status
      ) VALUES (
        ${name}, ${contact}, ${registeredCourse ?? ''}, ${desiredCourse},
        ${registeredDay ?? ''}, ${registeredFrom ?? ''}, ${registeredTo ?? ''},
        ${desiredDay}, ${desiredFrom}, ${desiredTo}, ${status ?? ''}
      ) RETURNING id
    `;
    console.log('SQL insert result:', result);
    if (!result || result.length === 0) {
      console.error('No row inserted. Check input data:', debugData);
      return {
        message: 'Insert failed. No row created.'
      };
    }
  } catch (error) {
    console.error('SQL error:', error);
    return {
      message: 'Database error. Failed to create request.'
    };
  }
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateExchangeRequest(id: string, prevState: RequestFormState, formData: FormData) {
  const validatedFields = RequestSchema.safeParse({
    name: formData.get('name'),
    contact: formData.get('contact'),
    registeredCourse: formData.get('registeredCourse'),
    desiredCourse: formData.get('desiredCourse'),
    registeredDay: formData.get('registeredDay'),
    registeredFrom: formData.get('registeredFrom'),
    registeredTo: formData.get('registeredTo'),
    desiredDay: formData.get('desiredDay'),
    desiredFrom: formData.get('desiredFrom'),
    desiredTo: formData.get('desiredTo'),
    status: formData.get('status'),
  });
  console.log('updateExchangeRequest called with:', { id });
  console.log('validatedFields:', validatedFields);
  if (!validatedFields.success) {
    console.log('Validation failed:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update request.',
    };
  }
  const {
    name, contact, registeredCourse, desiredCourse,
    registeredDay, registeredFrom, registeredTo,
    desiredDay, desiredFrom, desiredTo, status
  } = validatedFields.data;
  try {
    const result = await sql`
      UPDATE exchange_requests SET
        name = ${name}, contact = ${contact},
        registered_course = ${registeredCourse ?? ''}, desired_course = ${desiredCourse},
        registered_day = ${registeredDay ?? ''}, registered_from = ${registeredFrom ?? ''}, registered_to = ${registeredTo ?? ''},
        desired_day = ${desiredDay}, desired_from = ${desiredFrom}, desired_to = ${desiredTo},
        status = ${status ?? ''}
      WHERE id = ${id}
      RETURNING id
    `;
    console.log('SQL update result:', result);
    if (!result || result.length === 0) {
      console.error('No rows updated. Check if id exists:', id);
      return {
        message: 'No request found with the given id. Update failed.'
      };
    }
  } catch (error) {
    console.error('SQL error:', error);
    return {
      message: 'Database error. Failed to update request.'
    };
  }
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteExchangeRequest(id: string) {
  try {
    await sql`DELETE FROM exchange_requests WHERE id = ${id}`;
  } catch (error) {
    console.error(error);
  }
  revalidatePath('/dashboard');
}