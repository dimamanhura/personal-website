import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add feedback',
};

const AddFeedbackPage = async () => {
  return (
    <>
      <Header title="Add feedback" />
    </>
  );
}

export default AddFeedbackPage;
