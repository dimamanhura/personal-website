import { Metadata } from 'next';
import { OverviewHeader, CreateTechCategoryForm } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Tech Category - New',
};

const TechCategoryAddPage = () => {
  return (
    <>
      <OverviewHeader backPath={paths.techCategoriesAdmin()} />
      <CreateTechCategoryForm />
    </>
  );
};

export default TechCategoryAddPage;
