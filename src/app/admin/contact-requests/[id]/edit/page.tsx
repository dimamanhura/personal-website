import { ContactRequestOverviewHeader, EditContactRequestForm } from "@/components";
import { fetchContactRequestById } from "@/db/queries/contact-requests";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ContactRequestsEditPageProps {
  params: { id: string };
};

export function generateMetadata({ params: { id } }: ContactRequestsEditPageProps): Metadata {
  return {
    title: `Contact Requests - Edit - ${id}`,
  };
};

const ContactRequestsEditPage = async ({ params }: ContactRequestsEditPageProps) => {
  const contactRequest = await fetchContactRequestById(params.id);

  if (!contactRequest) {
    return notFound();
  }

  return (
    <>
      <ContactRequestOverviewHeader
        withEdit={false}
        itemId={params.id}
      />
      <EditContactRequestForm
        contactRequest={contactRequest}
      />
    </>
  );
};

export default ContactRequestsEditPage;
