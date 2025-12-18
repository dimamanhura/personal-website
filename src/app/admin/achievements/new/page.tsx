import { Metadata } from 'next';
import { CreateAchievementForm, OverviewHeader } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Achievement - New',
};

const AchievementAddPage = () => {
  return (
    <>
      <OverviewHeader backPath={paths.achievementsAdmin()} />
      <CreateAchievementForm />
    </>
  );
};

export default AchievementAddPage;
