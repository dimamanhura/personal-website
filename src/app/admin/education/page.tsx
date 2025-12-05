import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Education',
};

const EducationAdminPage = async () => {
  return (
    <>
      <Header title="Education" />
    </>
  );
};

export default EducationAdminPage;
