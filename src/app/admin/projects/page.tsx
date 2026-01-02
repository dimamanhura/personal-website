import { Metadata } from 'next';
import { fetchProjects } from '@/db/queries/projects';
import { ProjectsImportButton, ProjectsTable, AddItemButton, Header } from '@/components';
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
          <>
            <AddItemButton path={paths.projectsNewAdmin()} />,
            <ProjectsImportButton />
          </>
        )}
      />

      <ProjectsTable items={items} count={count} />
    </>
  );
};

export default ProjectsAdminPage;
