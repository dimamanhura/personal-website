import { Button } from '@nextui-org/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { EducationTable, Header } from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';
import { fetchUniversities } from '@/db/queries/education';

export const metadata: Metadata = {
  title: 'Education',
};

interface EducationAdminPageProps {
  searchParams: Promise<SearchParams>;
}

const EducationAdminPage = async ({ searchParams }: EducationAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchUniversities({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header
        title={metadata.title as string}
        renderActions={() => (
          <Button color="primary" variant="flat" as={Link} href={paths.educationNewAdmin()}>
            Add Education
          </Button>
        )}
      />

      <EducationTable items={items} count={count} />
    </>
  );
};

export default EducationAdminPage;
