import AchievementCard from "@/components/achievement-card";
import Header from "@/components/header";
import { fetchAchievements } from "@/db/queries/achievements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Challenges & Achievements',
  description: 'Overview of my contribution to projects with a description of what I made',
  keywords: ['Challenges', 'Achievements'],
};

const AchievementsPage = async () => {
  const { items } = await fetchAchievements({ all: true });
  return (
    <>
      <Header title="Challenges & Achievements" />
      <div className="w-full flex flex-col gap-4">
        {items.map(achievement => (
          <AchievementCard {...achievement} key={achievement.id} />
        ))}
      </div>
    </>
  );
};

export default AchievementsPage;
