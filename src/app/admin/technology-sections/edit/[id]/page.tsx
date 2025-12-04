import { Header } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit technology section',
};

const EditTechnologySectionPage = async () => {
  return (
    <>
      <Header title="Edit technology section" />
    </>
  );
}

export default EditTechnologySectionPage;
