import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add company',
};

const AddCompanyPage = async () => {
  return (
    <>
      <Header title="Add company" />
    </>
  );
}

export default AddCompanyPage;
