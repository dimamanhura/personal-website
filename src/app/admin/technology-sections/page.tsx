import { Button } from '@nextui-org/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { fetchTechnologySections } from '@/db/queries/technology-sections';
import { Header, TechnologySectionsTable } from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Technology Sections',
};

interface TechnologySectionsAdminPageProps {
  searchParams: Promise<SearchParams>;
}

const TechnologySectionsAdminPage = async ({ searchParams }: TechnologySectionsAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchTechnologySections({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header
        title={metadata.title as string}
        renderActions={() => (
          <Button
            color="primary"
            variant="flat"
            as={Link}
            href={paths.technologySectionsNewAdmin()}
          >
            Add Technology Section
          </Button>
        )}
      />

      <TechnologySectionsTable items={items} count={count} />
    </>
  );
};

export default TechnologySectionsAdminPage;
