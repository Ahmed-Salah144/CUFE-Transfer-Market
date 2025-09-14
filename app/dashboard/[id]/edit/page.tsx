

import { fetchExchangeRequestById } from '@/app/lib/data';
import EditRequestForm from '@/app/ui/requests/edit-form';
import Link from 'next/link';
import { notFound } from 'next/navigation';
type EditPageProps = {
  params: Promise<{ id: string }>
};

export default async function Page({ params }: EditPageProps) {
  const { id } = await params;
  const request = await fetchExchangeRequestById(id);
  if (!request) {
    notFound();
  }
  return (
    <main className="max-w-xl mx-auto p-6">
      <nav className="mb-4">
        <Link href="/dashboard" className="text-blue-600 underline">← Back to Dashboard</Link>
      </nav>
      <h2 className="text-xl font-bold mb-4">Edit Exchange Request</h2>
      <EditRequestForm request={request} />
    </main>
  );
}