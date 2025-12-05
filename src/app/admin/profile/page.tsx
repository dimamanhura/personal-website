import { Header } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

const ProfileAdminPage = async () => {
  return (
    <>
      <Header title="Profile" />
    </>
  );
};

export default ProfileAdminPage;
