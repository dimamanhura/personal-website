import { Metadata } from 'next';
import { fetchTechStacks } from '@/db/queries/tech-stacks';
import { CreateTechToolForm, OverviewHeader } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Tech Tool - New',
};

const TechToolsAddPage = async () => {
  const techStacks = await fetchTechStacks({ all: true });

  return (
    <>
      <OverviewHeader backPath={paths.techToolsAdmin()} />
      <CreateTechToolForm techStacks={techStacks.items} />
    </>
  );
};

export default TechToolsAddPage;
