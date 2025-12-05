import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Edit technology section',
};

const EditTechnologySectionPage = async () => {
  return (
    <>
      <Header title="Edit technology section" />
    </>
  );
};

export default EditTechnologySectionPage;
