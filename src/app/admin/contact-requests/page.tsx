import { Metadata } from 'next';
import { fetchContactRequests } from '@/db/queries/contact-requests';
import { ContactRequestsTable, Header } from '@/components';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Contact Requests',
};

interface ContactRequestsAdminPageProps {
  searchParams: Promise<SearchParams>;
}

const ContactRequestsAdminPage = async ({ searchParams }: ContactRequestsAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchContactRequests({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header title={metadata.title as string} />

      <ContactRequestsTable items={items} count={count} />
    </>
  );
};

export default ContactRequestsAdminPage;
