import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add technology section',
};

const AddTechnologySectionPage = async () => {
  return (
    <>
      <Header title="Add technology section" />
    </>
  );
};

export default AddTechnologySectionPage;
