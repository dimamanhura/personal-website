import { Metadata } from 'next';
import { TechnologySectionOverviewHeader, CreateTechnologySectionForm } from '@/components';

export const metadata: Metadata = {
  title: 'Technologies - New',
};

const TechnologySectionsAddPage = () => {
  return (
    <>
      <TechnologySectionOverviewHeader withEdit={false} withDelete={false} />
      <CreateTechnologySectionForm />
    </>
  );
};

export default TechnologySectionsAddPage;
