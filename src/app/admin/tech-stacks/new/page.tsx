import { Metadata } from 'next';
import { fetchTechCategories } from '@/db/queries/tech-categories';
import { OverviewHeader, CreateTechStackForm } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Tech Stack - New',
};

const TechStackAddPage = async () => {
  const categories = await fetchTechCategories({ all: true });
  return (
    <>
      <OverviewHeader backPath={paths.techStacksAdmin()} />
      <CreateTechStackForm categories={categories.items} />
    </>
  );
};

export default TechStackAddPage;
