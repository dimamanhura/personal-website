import { Metadata } from 'next';
import { fetchTechStacks } from '@/db/queries/tech-stacks';
import { CreateTechnologyForm, OverviewHeader } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Technologies - New',
};

const TechnologiesAddPage = async () => {
  const techStacks = await fetchTechStacks({ all: true });

  return (
    <>
      <OverviewHeader backPath={paths.technologiesAdmin()} />
      <CreateTechnologyForm techStacks={techStacks.items} />
    </>
  );
};

export default TechnologiesAddPage;
