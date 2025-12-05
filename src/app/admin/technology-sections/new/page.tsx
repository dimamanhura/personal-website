import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Add technology section',
};

const AddTechnologySectionPage = async () => {
  return (
    <>
      <Header title="Add technology section" />
    </>
  );
};

export default AddTechnologySectionPage;
