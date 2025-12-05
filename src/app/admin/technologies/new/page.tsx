import { CreateTechnologyForm, TechnologyOverviewHeader } from '@/components';
import { fetchTechnologiesSections } from '@/db/queries/technologies';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technologies - New',
};

const TechnologiesAddPage = async () => {
  const technologySections = await fetchTechnologiesSections();

  return (
    <>
      <TechnologyOverviewHeader withEdit={false} withDelete={false} />
      <CreateTechnologyForm technologySections={technologySections} />
    </>
  );
};

export default TechnologiesAddPage;
