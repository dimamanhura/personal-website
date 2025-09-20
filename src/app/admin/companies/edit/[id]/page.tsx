import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit company',
};

const EditCompanyPage = async () => {
  return (
    <>
      <Header title="Edit company" />
    </>
  );
}

export default EditCompanyPage;
