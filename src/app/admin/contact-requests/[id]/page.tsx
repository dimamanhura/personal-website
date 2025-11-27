import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact Requests Show',
};

interface ContactRequestsShowPageProps {
  params: Promise<{ id: string; }>
};

const ContactRequestsShowPage = async ({ params }: ContactRequestsShowPageProps) => {
  const { id } = await params;

  return (
    <div>
      Show: {id}
    </div>
  );
};

export default ContactRequestsShowPage;
