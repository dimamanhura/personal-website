import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Add education',
};

const AddEducationPage = async () => {
  return (
    <>
      <Header title="Add education" />
    </>
  );
};

export default AddEducationPage;
