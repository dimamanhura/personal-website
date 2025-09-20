import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit achievement',
};

const EditAchievementPage = async () => {
  return (
    <>
      <Header title="Edit achievement" />
    </>
  );
}

export default EditAchievementPage;
