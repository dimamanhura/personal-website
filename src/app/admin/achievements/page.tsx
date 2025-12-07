import { Button } from '@nextui-org/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { fetchAchievements } from '@/db/queries/achievements';
import { AchievementsTable, Header } from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Achievements',
};

interface AchievementsAdminPageProps {
  searchParams: Promise<SearchParams>;
}

const AchievementsAdminPage = async ({ searchParams }: AchievementsAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchAchievements({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header
        title={metadata.title as string}
        renderActions={() => (
          <Button color="primary" variant="flat" as={Link} href={paths.achievementsAdmin()}>
            Add Achievement
          </Button>
        )}
      />

      <AchievementsTable items={items} count={count} />
    </>
  );
};

export default AchievementsAdminPage;
