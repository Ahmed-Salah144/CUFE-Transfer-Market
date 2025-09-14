'use client';
import { updateExchangeRequest } from '@/app/lib/actions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { CourseCode, RequestStatus, ExchangeRequest } from '@/app/lib/definitions';
import { ClockIcon, CheckIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function EditRequestForm({ request }: { request: ExchangeRequest }) {
  async function handleAction(formData: FormData) {
    await updateExchangeRequest(request.id, {}, formData);
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
              defaultValue={request.name}
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
            defaultValue={request.contact}
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
            defaultValue={request.registeredCourse || ''}
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
            <select name="registeredDay" className="border rounded px-2 py-1 min-w-[80px]" defaultValue={request.registeredTimeslot.day || ''}>
              <option value="">None</option>
              {["Sat","Sun","Mon","Tue","Wed","Thu"].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select name="registeredFrom" className="border rounded px-2 py-1 min-w-[120px]" defaultValue={request.registeredTimeslot.from || ''}>
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
            <select name="registeredTo" className="border rounded px-2 py-1 min-w-[120px]" defaultValue={request.registeredTimeslot.to || ''}>
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
            defaultValue={request.desiredCourse || ''}
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
            <select name="desiredDay" className="border rounded px-2 py-1 min-w-[80px]" required defaultValue={request.desiredTimeslot.day}>
              <option value="">Day</option>
              {["Sat","Sun","Mon","Tue","Wed","Thu"].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select name="desiredFrom" className="border rounded px-2 py-1 min-w-[120px]" required defaultValue={request.desiredTimeslot.from}>
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
            <select name="desiredTo" className="border rounded px-2 py-1 min-w-[120px]" required defaultValue={request.desiredTimeslot.to}>
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
        {/* Status */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">Set the request status</legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value={RequestStatus.Pending}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={request.status === RequestStatus.Pending}
                />
                <label htmlFor="pending" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="completed"
                  name="status"
                  type="radio"
                  value={RequestStatus.Completed}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={request.status === RequestStatus.Completed}
                />
                <label htmlFor="completed" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
                  Completed <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="cancelled"
                  name="status"
                  type="radio"
                  value="cancelled"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-red-600 focus:ring-2"
                  defaultChecked={request.status === 'cancelled'}
                />
                <label htmlFor="cancelled" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white">
                  Cancelled
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Request</Button>
      </div>
    </form>
  );
}
