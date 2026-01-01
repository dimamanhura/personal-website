import { Metadata } from 'next';
import { fetchTechnologySections } from '@/db/queries/technology-sections';
import { CreateTechnologyForm, OverviewHeader } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Technologies - New',
};

const TechnologiesAddPage = async () => {
  const technologySections = await fetchTechnologySections({ all: true });

  return (
    <>
      <OverviewHeader backPath={paths.technologiesAdmin()} />
      <CreateTechnologyForm technologySections={technologySections.items} />
    </>
  );
};

export default TechnologiesAddPage;
