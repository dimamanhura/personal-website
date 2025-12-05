import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Edit company',
};

const EditCompanyPage = async () => {
  return (
    <>
      <Header title="Edit company" />
    </>
  );
};

export default EditCompanyPage;
