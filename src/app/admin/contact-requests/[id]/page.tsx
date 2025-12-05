import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchContactRequestById } from '@/db/queries/contact-requests';
import { ContactRequestOverviewHeader, ContactRequestCard } from '@/components';

interface ContactRequestShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: ContactRequestShowPageProps): Metadata {
  return {
    title: `Contact Requests - Details - ${id}`,
  };
}

const ContactRequestShowPage = async ({ params }: ContactRequestShowPageProps) => {
  const contactRequest = await fetchContactRequestById(params.id);

  if (!contactRequest) {
    return notFound();
  }

  return (
    <>
      <ContactRequestOverviewHeader itemId={params.id} />
      <ContactRequestCard contactRequest={contactRequest} />
    </>
  );
};

export default ContactRequestShowPage;
