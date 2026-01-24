import { Metadata } from 'next';
import { fetchTechTools } from '@/db/queries/tech-tools';
import { AddItemButton, Header, TechToolsImportButton, TechToolsTable } from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Tech Tools',
};

interface TechToolsAdminPageProps {
  searchParams: Promise<SearchParams>;
}

const TechToolsAdminPage = async ({ searchParams }: TechToolsAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchTechTools({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header
        title={metadata.title as string}
        renderActions={() => (
          <>
            <AddItemButton path={paths.techToolsNewAdmin()} />
            <TechToolsImportButton />
          </>
        )}
      />

      <TechToolsTable items={items} count={count} />
    </>
  );
};

export default TechToolsAdminPage;
