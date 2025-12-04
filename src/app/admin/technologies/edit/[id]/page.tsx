import { Header } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit technology',
};

const EditTechnologyPage = async () => {
  return (
    <>
      <Header title="Edit technology" />
    </>
  );
}

export default EditTechnologyPage;
