import { RequestStatus } from '../../lib/definitions';

export default function Status({ status }: { status: RequestStatus }) {
  let color = 'bg-yellow-200 text-yellow-800';
  if (status === 'completed') color = 'bg-green-200 text-green-800';
  else if (status === 'cancelled') color = 'bg-red-200 text-red-800';
  return (
    <span className={`px-2 py-1 rounded ${color}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  );
}
