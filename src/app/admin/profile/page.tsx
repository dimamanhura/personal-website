import { Metadata } from 'next';
import { Header } from '@/components';

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
