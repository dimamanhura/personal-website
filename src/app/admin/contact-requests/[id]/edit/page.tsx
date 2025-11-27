import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact Requests Edit',
};

interface ContactRequestsEditPageProps {
  params: Promise<{ id: string }>
};

const ContactRequestsEditPage = async ({ params }: ContactRequestsEditPageProps) => {
  const { id } = await params;

  return (
    <div>
      Edit: {id}
    </div>
  );
};

export default ContactRequestsEditPage;
