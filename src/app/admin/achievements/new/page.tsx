import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add achievement',
};

const AddAchievementPage = async () => {
  return (
    <>
      <Header title="Add achievement" />
    </>
  );
}

export default AddAchievementPage;
