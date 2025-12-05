import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Add company',
};

const AddCompanyPage = async () => {
  return (
    <>
      <Header title="Add company" />
    </>
  );
};

export default AddCompanyPage;
