import { Metadata } from 'next';
import { CompaniesTable, Header } from '@/components';
import { SearchParams } from '@/types';
import { fetchCompanies } from '@/db/queries/companies';
import { Button } from '@nextui-org/react';
import paths from '@/paths';
import Link from 'next/link';

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
          <Button color="primary" variant="flat" as={Link} href={paths.companiesNewAdmin()}>
            Add Company
          </Button>
        )}
      />

      <CompaniesTable items={items} count={count} />
    </>
  );
};

export default CompaniesAdminPage;
