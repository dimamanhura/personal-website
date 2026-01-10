import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProfileById } from '@/db/queries/meta';
import { deleteProfile } from '@/actions';
import { OverviewHeader, ProfileCard } from '@/components';
import paths from '@/paths';

interface ProfileShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: ProfileShowPageProps): Metadata {
  return {
    title: `Profile - Details - ${id}`,
  };
}

const ProfileShowPage = async ({ params }: ProfileShowPageProps) => {
  const profile = await fetchProfileById(params.id);

  if (!profile) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.profileAdmin()}
        editPath={paths.profileEditByIdAdmin(params.id)}
        itemId={params.id}
        onDelete={deleteProfile}
      />
      <ProfileCard profile={profile} />
    </>
  );
};

export default ProfileShowPage;
