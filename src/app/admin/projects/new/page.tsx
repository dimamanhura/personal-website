import { Header } from '@/components';
import { Metadata } from 'next';

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
