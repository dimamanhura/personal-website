import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAchievementById } from '@/db/queries/achievements';
import { AchievementOverviewHeader, EditAchievementForm } from '@/components';

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
      <AchievementOverviewHeader withEdit={false} itemId={params.id} />
      <EditAchievementForm achievement={achievement} />
    </>
  );
};

export default AchievementEditPage;
