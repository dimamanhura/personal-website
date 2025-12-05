import { Metadata } from 'next';
import { AchievementOverviewHeader, CreateAchievementForm } from '@/components';

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
