import { Metadata } from 'next';
import { fetchAchievements } from '@/db/queries/achievements';
import { AchievementCard, Header } from '@/components';

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
      <div className="flex w-full flex-col gap-4">
        {items.map((achievement) => (
          <AchievementCard {...achievement} key={achievement.id} />
        ))}
      </div>
    </>
  );
};

export default AchievementsPage;
