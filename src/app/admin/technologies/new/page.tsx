import { AchievementOverviewHeader, CreateAchievementForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Achievement - New',
};

const AchievementAddPage = () => {
  return (
    <>
      <AchievementOverviewHeader withEdit={false} withDelete={false} />
      <CreateAchievementForm />
    </>
  );
};

export default AchievementAddPage;
