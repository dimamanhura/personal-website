import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechCategoryById } from '@/db/queries/tech-categories';
import { deleteTechCategory } from '@/actions';
import { OverviewHeader, TechCategoryCard } from '@/components';
import paths from '@/paths';

interface TechCategoryShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: TechCategoryShowPageProps): Metadata {
  return {
    title: `Tech Category - Details - ${id}`,
  };
}

const TechCategoryShowPage = async ({ params }: TechCategoryShowPageProps) => {
  const techCategory = await fetchTechCategoryById(params.id);

  if (!techCategory) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.techCategoriesAdmin()}
        itemId={params.id}
        editPath={paths.techCategoriesEditByIdAdmin(params.id)}
        onDelete={deleteTechCategory}
      />
      <TechCategoryCard techCategory={techCategory} />
    </>
  );
};

export default TechCategoryShowPage;
