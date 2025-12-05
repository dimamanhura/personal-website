import { Metadata } from 'next';
import { fetchTechnologiesSections } from '@/db/queries/technologies';
import { CreateTechnologyForm, TechnologyOverviewHeader } from '@/components';

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
