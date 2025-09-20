import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Education',
};

const EducationAdminPage = async () => {

  return (
    <>
      <Header title="Education" />
    </>
  );
}

export default EducationAdminPage;
