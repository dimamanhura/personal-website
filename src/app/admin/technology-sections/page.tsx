import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Technology Sections',
};

const TechnologySectionsAdminPage = async () => {

  return (
    <>
      <Header title="Technology Sections" />
    </>
  );
}

export default TechnologySectionsAdminPage;
