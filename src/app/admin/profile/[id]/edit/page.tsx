import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProfileById } from '@/db/queries/meta';
import { deleteProfile } from '@/actions';
import { OverviewHeader, EditProfileForm } from '@/components';
import paths from '@/paths';

interface ProfileEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: ProfileEditPageProps): Metadata {
  return {
    title: `Profile - Edit - ${id}`,
  };
}

const ProfileEditPage = async ({ params }: ProfileEditPageProps) => {
  const profile = await fetchProfileById(params.id);

  if (!profile) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader backPath={paths.profileAdmin()} itemId={params.id} onDelete={deleteProfile} />
      <EditProfileForm profile={profile} />
    </>
  );
};

export default ProfileEditPage;
