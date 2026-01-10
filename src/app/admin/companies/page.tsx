import { Metadata } from 'next';
import { fetchCompanies } from '@/db/queries/companies';
import { AddItemButton, CompaniesImportButton, CompaniesTable, Header } from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Companies',
};

interface CompaniesAdminPageProps {
  searchParams: Promise<SearchParams>;
}

const CompaniesAdminPage = async ({ searchParams }: CompaniesAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchCompanies({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header
        title={metadata.title as string}
        renderActions={() => (
          <>
            <AddItemButton path={paths.companiesNewAdmin()} />
            <CompaniesImportButton />
          </>
        )}
      />

      <CompaniesTable items={items} count={count} />
    </>
  );
};

export default CompaniesAdminPage;
