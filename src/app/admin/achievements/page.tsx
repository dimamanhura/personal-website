import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Achievements',
};

const AchievementsAdminPage = async () => {

  return (
    <>
      <Header title="Achievements" />
    </>
  );
}

export default AchievementsAdminPage;
