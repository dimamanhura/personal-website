import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact Requests',
};

const ContactRequestsAdminPage = async () => {

  return (
    <>
      <Header title="Contact Requests" />
    </>
  );
}

export default ContactRequestsAdminPage;
