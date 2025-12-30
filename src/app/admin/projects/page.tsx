import { Button } from '@nextui-org/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { fetchProjects } from '@/db/queries/projects';
import { Header, ProjectsTable } from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Projects',
};

interface ProjectsAdminPageProps {
  searchParams: Promise<SearchParams>;
}

const ProjectsAdminPage = async ({ searchParams }: ProjectsAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchProjects({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header
        title={metadata.title as string}
        renderActions={() => (
          <Button color="primary" variant="flat" as={Link} href={paths.projectsNewAdmin()}>
            Add Project
          </Button>
        )}
      />

      <ProjectsTable items={items} count={count} />
    </>
  );
};

export default ProjectsAdminPage;
