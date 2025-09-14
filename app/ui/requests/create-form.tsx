'use client';
'use client';
import { createExchangeRequest } from '@/app/lib/actions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { CourseCode, RequestStatus } from '@/app/lib/definitions';
import { ClockIcon, CheckIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function CreateRequestForm() {
  async function handleAction(formData: FormData) {
    await createExchangeRequest({}, formData);
  }
  return (
    <form action={handleAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/* Contact Info */}
        <div className="mb-4">
          <label htmlFor="contact" className="mb-2 block text-sm font-medium">
            Contact Info
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            placeholder="Email or phone"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            required
          />
        </div>
        {/* Registered Course */}
        <div className="mb-4">
          <label htmlFor="registeredCourse" className="mb-2 block text-sm font-medium">
            Registered Course
          </label>
          <input
            id="registeredCourse"
            name="registeredCourse"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            list="registeredCourseOptions"
            defaultValue=""
            placeholder="None or type a code"
          />
          <datalist id="registeredCourseOptions">
            <option value="">None</option>
            {Object.values(CourseCode).map((code) => (
              <option key={code} value={code} />
            ))}
          </datalist>
        </div>
        {/* Registered Timeslot */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Registered Timeslot</label>
          <div className="flex gap-2">
            <select name="registeredDay" className="border rounded px-2 py-1 min-w-[80px]" defaultValue="">
              <option value="">None</option>
              {['Sat','Sun','Mon','Tue','Wed','Thu'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select name="registeredFrom" className="border rounded px-2 py-1 min-w-[120px]" defaultValue="">
              <option value="">None</option>
              {Array.from({ length: 12 }, (_, i) => {
                const hour = i + 8;
                let label = '';
                if (hour < 12) label = `${hour}am`;
                else if (hour === 12) label = '12pm';
                else label = `${hour - 12}pm`;
                return <option key={label} value={label}>{label}</option>;
              })}
            </select>
            <span>to</span>
            <select name="registeredTo" className="border rounded px-2 py-1 min-w-[120px]" defaultValue="">
              <option value="">None</option>
              {Array.from({ length: 12 }, (_, i) => {
                const hour = i + 8;
                let label = '';
                if (hour < 12) label = `${hour}am`;
                else if (hour === 12) label = '12pm';
                else label = `${hour - 12}pm`;
                return <option key={label} value={label}>{label}</option>;
              })}
            </select>
          </div>
        </div>
        {/* Desired Course */}
        <div className="mb-4">
          <label htmlFor="desiredCourse" className="mb-2 block text-sm font-medium">
            Desired Course
          </label>
          <input
            id="desiredCourse"
            name="desiredCourse"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            list="desiredCourseOptions"
            required
            defaultValue=""
            placeholder="Type or select a course"
          />
          <datalist id="desiredCourseOptions">
            {Object.values(CourseCode).map((code) => (
              <option key={code} value={code} />
            ))}
          </datalist>
        </div>
        {/* Desired Timeslot */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Desired Timeslot</label>
          <div className="flex gap-2">
            <select name="desiredDay" className="border rounded px-2 py-1 min-w-[80px]" required>
              <option value="">Day</option>
              {["Sat","Sun","Mon","Tue","Wed","Thu"].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select name="desiredFrom" className="border rounded px-2 py-1 min-w-[120px]" required>
              <option value="">From</option>
              {Array.from({ length: 12 }, (_, i) => {
                const hour = i + 8;
                let label = '';
                if (hour < 12) label = `${hour}am`;
                else if (hour === 12) label = '12pm';
                else label = `${hour - 12}pm`;
                return <option key={label} value={label}>{label}</option>;
              })}
            </select>
            <span>to</span>
            <select name="desiredTo" className="border rounded px-2 py-1 min-w-[120px]" required>
              <option value="">To</option>
              {Array.from({ length: 12 }, (_, i) => {
                const hour = i + 8;
                let label = '';
                if (hour < 12) label = `${hour}am`;
                else if (hour === 12) label = '12pm';
                else label = `${hour - 12}pm`;
                return <option key={label} value={label}>{label}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Request</Button>
      </div>
    </form>
  );
}
