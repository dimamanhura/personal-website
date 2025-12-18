import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAchievementById } from '@/db/queries/achievements';
import { AchievementCard, OverviewHeader } from '@/components';
import paths from '@/paths';
import { deleteAchievement } from '@/actions';

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
      <OverviewHeader
        backPath={paths.achievementsAdmin()}
        itemId={params.id}
        editPath={paths.achievementsEditByIdAdmin(params.id)}
        onDelete={deleteAchievement}
      />
      <AchievementCard {...achievement} withFeaturedFlag />
    </>
  );
};

export default AchievementShowPage;
