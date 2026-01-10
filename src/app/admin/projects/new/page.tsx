import { Metadata } from 'next';
import { OverviewHeader, CreateProjectForm } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Project - New',
};

const ProjectAddPage = () => {
  return (
    <>
      <OverviewHeader backPath={paths.projectsAdmin()} />
      <CreateProjectForm />
    </>
  );
};

export default ProjectAddPage;
