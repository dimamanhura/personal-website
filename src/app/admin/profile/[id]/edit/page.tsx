import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OverviewHeader, EditProfileForm } from '@/components';
import { deleteProfile } from '@/actions';
import paths from '@/paths';
import { fetchProfileById } from '@/db/queries/meta';

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
