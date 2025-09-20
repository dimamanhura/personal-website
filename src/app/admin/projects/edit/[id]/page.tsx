import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit project',
};

const EditProjectPage = async () => {
  return (
    <>
      <Header title="Edit project" />
    </>
  );
}

export default EditProjectPage;
