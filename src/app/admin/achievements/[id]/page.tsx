import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAchievementById } from '@/db/queries/achievements';
import { AchievementCard, AchievementOverviewHeader } from '@/components';

interface AchievementShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: AchievementShowPageProps): Metadata {
  return {
    title: `Achievement - Details - ${id}`,
  };
}

const AchievementShowPage = async ({ params }: AchievementShowPageProps) => {
  const achievement = await fetchAchievementById(params.id);

  if (!achievement) {
    return notFound();
  }

  return (
    <>
      <AchievementOverviewHeader itemId={params.id} />
      <AchievementCard {...achievement} withFeaturedFlag />
    </>
  );
};

export default AchievementShowPage;
