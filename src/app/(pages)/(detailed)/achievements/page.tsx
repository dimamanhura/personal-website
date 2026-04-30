import { Metadata } from 'next';
import { fetchAchievements } from '@/db/queries/achievements';
import { AchievementCard, BackToAllLink, Header } from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Challenges & Achievements',
  description: 'Overview of my contribution to projects with a description of what I made',
  keywords: ['Challenges', 'Achievements'],
};

interface AchievementsPageProps {
  searchParams: Promise<SearchParams>;
}

const AchievementsPage = async ({ searchParams }: AchievementsPageProps) => {
  const { id } = await searchParams;
  const { items } = await fetchAchievements({ where: { id }, all: true });

  return (
    <>
      {id ? (
        <BackToAllLink path={paths.achievements()} />
      ) : (
        <Header title="Challenges & Achievements" />
      )}
      <div className="flex w-full flex-col gap-4">
        {items.map((achievement) => (
          <AchievementCard {...achievement} key={achievement.id} />
        ))}
      </div>
    </>
  );
};

export default AchievementsPage;
