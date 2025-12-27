import { Metadata } from 'next';
import { Header, ProfileTable } from '@/components';
import { SearchParams } from '@/types';
import { fetchProfiles } from '@/db/queries/meta';

export const metadata: Metadata = {
  title: 'Profile',
};

interface ProfileAdminPageProps {
  searchParams: Promise<SearchParams>;
}

const ProfileAdminPage = async ({ searchParams }: ProfileAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchProfiles({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header title={metadata.title as string} />
      <ProfileTable items={items} count={count} />
    </>
  );
};

export default ProfileAdminPage;
