import { Metadata } from 'next';
import { Header } from '@/components';

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
