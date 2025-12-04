import { Header } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add education',
};

const AddEducationPage = async () => {
  return (
    <>
      <Header title="Add education" />
    </>
  );
}

export default AddEducationPage;
