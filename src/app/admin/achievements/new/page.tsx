import AchievementOverviewHeader from "@/components/achievement-overview-header";
import CreateAchievementForm from "@/components/create-achievement-form";
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
