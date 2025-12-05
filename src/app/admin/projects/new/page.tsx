import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Add project',
};

const AddProjectPage = async () => {
  return (
    <>
      <Header title="Add project" />
    </>
  );
};

export default AddProjectPage;
