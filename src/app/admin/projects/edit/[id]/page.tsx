import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Edit project',
};

const EditProjectPage = async () => {
  return (
    <>
      <Header title="Edit project" />
    </>
  );
};

export default EditProjectPage;
