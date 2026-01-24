import { Metadata } from 'next';
import { fetchTechCategories } from '@/db/queries/tech-categories';
import {
  AddItemButton,
  Header,
  TechCategoriesImportButton,
  TechCategoriesTable,
} from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Tech Categories',
};

interface TechCategoriesAdminPageProps {
  searchParams: Promise<SearchParams>;
}

const TechCategoriesAdminPage = async ({ searchParams }: TechCategoriesAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchTechCategories({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header
        title={metadata.title as string}
        renderActions={() => (
          <>
            <AddItemButton path={paths.techCategoriesNewAdmin()} />
            <TechCategoriesImportButton />
          </>
        )}
      />

      <TechCategoriesTable items={items} count={count} />
    </>
  );
};

export default TechCategoriesAdminPage;
