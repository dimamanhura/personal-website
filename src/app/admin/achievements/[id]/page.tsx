import { notFound } from "next/navigation";
import { Metadata } from "next";
import FeedbackOverviewHeader from "@/components/feedback-overview-header";
import AchievementCard from "@/components/achievement-card";
import { fetchAchievementById } from "@/db/queries/achievements";

interface AchievementShowPageProps {
  params: {
    id: string;
  };
};

export function generateMetadata({ params: { id } }: AchievementShowPageProps): Metadata {
  return {
    title: `Achievement - Details - ${id}`,
  };
};

const AchievementShowPage = async ({ params }: AchievementShowPageProps) => {
  const achievement = await fetchAchievementById(params.id);

  if (!achievement) {
    return notFound();
  }

  return (
    <>
      <FeedbackOverviewHeader itemId={params.id} />
      <AchievementCard {...achievement} />
    </>
  );
};

export default AchievementShowPage;
