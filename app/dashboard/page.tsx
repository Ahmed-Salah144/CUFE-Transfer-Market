

import { fetchExchangeRequests, fetchRequestsPages } from '@/app/lib/data';
import Pagination from '@/app/ui/requests/pagination';
import { CourseCode } from '@/app/lib/definitions';
import RequestsTable from '@/app/ui/requests/table';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';



type DashboardPageProps = {
  searchParams?: Promise<{
    registeredCourse?: string;
    desiredCourse?: string;
    search?: string;
    registeredStart?: string;
    desiredStart?: string;
    registeredDay?: string;
    desiredDay?: string;
    page?: string | number;
  }>;
};

export default async function Page({ searchParams }: DashboardPageProps) {
  const params = (await searchParams) ?? {};
  // Normalize 'Any' and empty values for filtering
  const normalizeCourseFilter = (val: string | null | undefined) => {
    if (!val || val === '' || val.toLowerCase() === 'any') return undefined;
    return val;
  };
  const registeredCourse = normalizeCourseFilter(params.registeredCourse) as CourseCode | undefined;
  const desiredCourse = normalizeCourseFilter(params.desiredCourse) as CourseCode | undefined;
  const search = params.search || '';
  const registeredStart = params.registeredStart || '';
  const desiredStart = params.desiredStart || '';
  const registeredDay = params.registeredDay || '';
  const desiredDay = params.desiredDay || '';
  let pageParam = 1;
  if (params.page) {
    pageParam = Number(params.page) || 1;
  }
  const currentPage = pageParam;
  const pageSize = 10;
  const filteredRequests = await fetchExchangeRequests(registeredCourse, desiredCourse, search, registeredStart, desiredStart, registeredDay, desiredDay);
  const requests = filteredRequests.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize));

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Timeslot Exchange Requests</h1>
        <Link href="/dashboard/create" className="bg-blue-600 text-white px-4 py-2 rounded">Add New Request</Link>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {/* Use Search component above filters */}
        <div className="mb-4 flex gap-2">
          <Search placeholder="Search all fields" />
        </div>
        <form method="get">
          <div className="flex flex-wrap gap-4">
            {/* Desired Course */}
            <label className="flex flex-col text-sm min-w-[120px] flex-1">
              Desired Course:
              <input
                name="desiredCourse"
                defaultValue={desiredCourse || ''}
                className="mt-1 border rounded px-2 py-1 w-full"
                list="desiredCourseFilterOptions"
                placeholder="Course Code"
              />
              <datalist id="desiredCourseFilterOptions">
                <option value="">Any</option>
                <option value="Any" />
                {(Object.values(CourseCode) as string[]).map(code => (
                  <option key={code} value={code} />
                ))}
              </datalist>
            </label>
            {/* Desired Day */}
            <label className="flex flex-col text-sm min-w-[100px] flex-1">
              Desired Day:
              <select
                name="desiredDay"
                defaultValue={desiredDay || ''}
                className="mt-1 border rounded px-2 py-1 w-full"
              >
                <option value="">Any</option>
                {["Sat","Sun","Mon","Tue","Wed","Thu"].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </label>
            {/* Desired Start Hour */}
            <label className="flex flex-col text-sm min-w-[120px] flex-1">
              Desired Start Hour:
              <select
                name="desiredStart"
                defaultValue={desiredStart}
                className="mt-1 border rounded px-2 py-1 w-full"
              >
                <option value="">Any</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = i + 8;
                  let label = '';
                  if (hour < 12) label = `${hour}am`;
                  else if (hour === 12) label = '12pm';
                  else label = `${hour - 12}pm`;
                  return <option key={label} value={label}>{label}</option>;
                })}
              </select>
            </label>
            {/* Registered Course */}
            <label className="flex flex-col text-sm min-w-[120px] flex-1">
              Registered Course:
              <input
                name="registeredCourse"
                defaultValue={registeredCourse || ''}
                className="mt-1 border rounded px-2 py-1 w-full"
                list="registeredCourseFilterOptions"
                placeholder="Course Code"
              />
              <datalist id="registeredCourseFilterOptions">
                <option value="">Any</option>
                <option value="Any" />
                {(Object.values(CourseCode) as string[]).map(code => (
                  <option key={code} value={code} />
                ))}
              </datalist>
            </label>
            {/* Registered Day */}
            <label className="flex flex-col text-sm min-w-[100px] flex-1">
              Registered Day:
              <select
                name="registeredDay"
                defaultValue={registeredDay || ''}
                className="mt-1 border rounded px-2 py-1 w-full"
              >
                <option value="">Any</option>
                {["Sat","Sun","Mon","Tue","Wed","Thu"].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </label>
            {/* Registered Start Hour */}
            <label className="flex flex-col text-sm min-w-[120px] flex-1">
              Registered Start Hour:
              <select
                name="registeredStart"
                defaultValue={registeredStart}
                className="mt-1 border rounded px-2 py-1 w-full"
              >
                <option value="">Any</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = i + 8;
                  let label = '';
                  if (hour < 12) label = `${hour}am`;
                  else if (hour === 12) label = '12pm';
                  else label = `${hour - 12}pm`;
                  return <option key={label} value={label}>{label}</option>;
                })}
              </select>
            </label>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded h-fit self-end">Filter</button>
          </div>
        </form>
      </div>
      <div className="mt-8">
        <RequestsTable requests={requests} />
        {requests.length === 0 && <div className="mt-4 text-gray-500">No exchange requests found.</div>}
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}