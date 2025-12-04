import { Header } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add technology',
};

const AddTechnologyPage = async () => {
  return (
    <>
      <Header title="Add technology" />
    </>
  );
}

export default AddTechnologyPage;
