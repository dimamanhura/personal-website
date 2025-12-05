import { Header } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
};

const ProjectsAdminPage = async () => {
  return (
    <>
      <Header title="Projects" />
    </>
  );
};

export default ProjectsAdminPage;
