import { Metadata } from 'next';
import { fetchTechStacks } from '@/db/queries/tech-stacks';
import { fetchTechTools } from '@/db/queries/tech-tools';
import { OverviewHeader, CreateProjectForm } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Project - New',
};

const ProjectAddPage = async () => {
  const { items: stacks } = await fetchTechStacks({ all: true });
  const { items: tools } = await fetchTechTools({ all: true });

  return (
    <>
      <OverviewHeader backPath={paths.projectsAdmin()} />
      <CreateProjectForm stacks={stacks} tools={tools} />
    </>
  );
};

export default ProjectAddPage;
