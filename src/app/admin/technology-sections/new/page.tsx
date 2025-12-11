import { Metadata } from 'next';
import { fetchTechnologySections } from '@/db/queries/technology-sections';
import { CreateTechnologyForm, TechnologyOverviewHeader } from '@/components';

export const metadata: Metadata = {
  title: 'Technologies - New',
};

const TechnologiesAddPage = async () => {
  const technologySections = await fetchTechnologySections({ all: true });

  return (
    <>
      <TechnologyOverviewHeader withEdit={false} withDelete={false} />
      <CreateTechnologyForm technologySections={technologySections.items} />
    </>
  );
};

export default TechnologiesAddPage;
