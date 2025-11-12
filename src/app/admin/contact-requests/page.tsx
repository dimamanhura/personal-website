import ContactRequestsTable from "@/components/contact-requests-table";
import Header from "@/components/header";
import { fetchContactRequests } from "@/db/queries/contact-requests";
import { Order } from "@/types/Order";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact Requests',
};

interface ContactRequestsAdminPageProps {
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
    order?: Order; 
  }>
};

const ContactRequestsAdminPage = async ({ searchParams }: ContactRequestsAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchContactRequests({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header title={metadata.title as string} />

      <ContactRequestsTable
        items={items}
        count={count}
      />
    </>
  );
};

export default ContactRequestsAdminPage;
