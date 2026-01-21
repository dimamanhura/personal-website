import { Metadata } from 'next';
import { fetchTechStacks } from '@/db/queries/tech-stacks';
import { AddItemButton, Header, TechStacksImportButton, TechStacksTable } from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Tech Stacks',
};

interface TechStacksAdminPageProps {
  searchParams: Promise<SearchParams>;
}

const TechStacksAdminPage = async ({ searchParams }: TechStacksAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchTechStacks({
    onlyFeatured: false,
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header
        title={metadata.title as string}
        renderActions={() => (
          <>
            <AddItemButton path={paths.techStacksNewAdmin()} />
            <TechStacksImportButton />
          </>
        )}
      />

      <TechStacksTable items={items} count={count} />
    </>
  );
};

export default TechStacksAdminPage;
