import { Metadata } from 'next';
import { OverviewHeader, CreateEducationForm } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Education - New',
};

const TechnologySectionsAddPage = () => {
  return (
    <>
      <OverviewHeader backPath={paths.educationAdmin()} />
      <CreateEducationForm />
    </>
  );
};

export default TechnologySectionsAddPage;
