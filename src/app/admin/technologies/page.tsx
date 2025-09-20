import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Technologies',
};

const TechnologiesAdminPage = async () => {

  return (
    <>
      <Header title="Technologies" />
    </>
  );
}

export default TechnologiesAdminPage;
