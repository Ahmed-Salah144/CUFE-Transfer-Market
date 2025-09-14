
import { UpdateRequest, DeleteRequest } from '@/app/ui/requests/buttons';
import Status from '@/app/ui/requests/status';

export default function RequestsTable({ requests }: { requests: any[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {requests?.map((r) => (
              <div
                key={r.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* No image for requests, just name */}
                      <p>{r.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{r.contact}</p>
                  </div>
                  <Status status={r.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {r.registeredCourse} → {r.desiredCourse}
                    </p>
                    <p>{r.registeredTimeslot.day}-{r.registeredTimeslot.from} - {r.registeredTimeslot.to} → {r.desiredTimeslot.day}-{r.desiredTimeslot.from} - {r.desiredTimeslot.to}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateRequest id={r.id} />
                    {/* <DeleteRequest id={r.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Contact
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Registered Course
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Registered Timeslot
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Desired Course
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Desired Timeslot
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {requests?.map((r) => (
                <tr
                  key={r.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{r.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {r.contact}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {r.registeredCourse}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {r.registeredTimeslot.day}-{r.registeredTimeslot.from} - {r.registeredTimeslot.to}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {r.desiredCourse}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {r.desiredTimeslot.day}-{r.desiredTimeslot.from} - {r.desiredTimeslot.to}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={r.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateRequest id={r.id} />
                      {/* <DeleteRequest id={r.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
