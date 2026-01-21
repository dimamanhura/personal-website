import { Metadata } from 'next';
import { OverviewHeader, CreateTechStackForm } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Tech Stack - New',
};

const TechStackAddPage = () => {
  return (
    <>
      <OverviewHeader backPath={paths.techStacksAdmin()} />
      <CreateTechStackForm />
    </>
  );
};

export default TechStackAddPage;
