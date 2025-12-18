import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAchievementById } from '@/db/queries/achievements';
import { EditAchievementForm, OverviewHeader } from '@/components';
import paths from '@/paths';
import { deleteAchievement } from '@/actions';

interface AchievementEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: AchievementEditPageProps): Metadata {
  return {
    title: `Achievement - Edit - ${id}`,
  };
}

const AchievementEditPage = async ({ params }: AchievementEditPageProps) => {
  const achievement = await fetchAchievementById(params.id);

  if (!achievement) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        itemId={params.id}
        backPath={paths.achievementsAdmin()}
        onDelete={deleteAchievement}
      />
      <EditAchievementForm achievement={achievement} />
    </>
  );
};

export default AchievementEditPage;
