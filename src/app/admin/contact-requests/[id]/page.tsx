import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchContactRequestById } from "@/db/queries/contact-requests";
import ContactRequestOverviewHeader from "@/components/contact-request-overview-header";
import ContactRequestCard from "@/components/contact-request-card";

interface ContactRequestShowPageProps {
  params: {
    id: string;
  };
};

export function generateMetadata({ params: { id } }: ContactRequestShowPageProps): Metadata {
  return {
    title: `Contact Requests - Details - ${id}`,
  };
};

const ContactRequestShowPage = async ({ params }: ContactRequestShowPageProps) => {
  const contactRequest = await fetchContactRequestById(params.id);

  if (!contactRequest) {
    return notFound();
  }

  return (
    <>
      <ContactRequestOverviewHeader
        itemId={params.id}
      />
      <ContactRequestCard
        contactRequest={contactRequest}
      />
    </>
  );
}

export default ContactRequestShowPage;
