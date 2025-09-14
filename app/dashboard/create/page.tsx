

import CreateRequestForm from '@/app/ui/requests/create-form';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <nav className="mb-4">
        <Link href="/dashboard" className="text-blue-600 underline">← Back to Dashboard</Link>
      </nav>
      <h2 className="text-xl font-bold mb-4">Create Exchange Request</h2>
      <CreateRequestForm />
    </main>
  );
}