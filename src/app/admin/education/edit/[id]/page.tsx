import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Edit education',
};

const EditEducationPage = async () => {
  return (
    <>
      <Header title="Edit education" />
    </>
  );
};

export default EditEducationPage;
