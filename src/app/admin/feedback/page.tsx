import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Feedback',
};

const FeedbackAdminPage = async () => {

  return (
    <>
      <Header title="Feedback" />
    </>
  );
}

export default FeedbackAdminPage;
