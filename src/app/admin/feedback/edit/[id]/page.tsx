import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit feedback',
};

const EditFeedbackPage = async () => {
  return (
    <>
      <Header title="Edit feedback" />
    </>
  );
}

export default EditFeedbackPage;
