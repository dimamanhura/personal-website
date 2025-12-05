import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Technology Sections',
};

const TechnologySectionsAdminPage = async () => {
  return (
    <>
      <Header title="Technology Sections" />
    </>
  );
};

export default TechnologySectionsAdminPage;
