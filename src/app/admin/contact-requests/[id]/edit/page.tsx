import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchContactRequestById } from '@/db/queries/contact-requests';
import { deleteContactRequest } from '@/actions';
import { EditContactRequestForm, OverviewHeader } from '@/components';
import paths from '@/paths';

interface ContactRequestsEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: ContactRequestsEditPageProps): Metadata {
  return {
    title: `Contact Requests - Edit - ${id}`,
  };
}

const ContactRequestsEditPage = async ({ params }: ContactRequestsEditPageProps) => {
  const contactRequest = await fetchContactRequestById(params.id);

  if (!contactRequest) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.contactRequestsAdmin()}
        itemId={params.id}
        onDelete={deleteContactRequest}
      />
      <EditContactRequestForm contactRequest={contactRequest} />
    </>
  );
};

export default ContactRequestsEditPage;
