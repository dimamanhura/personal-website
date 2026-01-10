import { Metadata } from 'next';
import { OverviewHeader, CreateTechnologySectionForm } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Technologies - New',
};

const TechnologySectionsAddPage = () => {
  return (
    <>
      <OverviewHeader backPath={paths.technologySectionsAdmin()} />
      <CreateTechnologySectionForm />
    </>
  );
};

export default TechnologySectionsAddPage;
