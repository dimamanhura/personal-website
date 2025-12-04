import { Header } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit education',
};

const EditEducationPage = async () => {
  return (
    <>
      <Header title="Edit education" />
    </>
  );
}

export default EditEducationPage;
