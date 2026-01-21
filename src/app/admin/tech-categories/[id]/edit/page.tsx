import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechCategoryById } from '@/db/queries/tech-categories';
import { deleteTechCategory } from '@/actions';
import { EditTechCategoryForm, OverviewHeader } from '@/components';
import paths from '@/paths';

interface TechCategoryEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: TechCategoryEditPageProps): Metadata {
  return {
    title: `Tech Category - Edit - ${id}`,
  };
}

const TechCategoryEditPage = async ({ params }: TechCategoryEditPageProps) => {
  const techCategory = await fetchTechCategoryById(params.id);

  if (!techCategory) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        itemId={params.id}
        backPath={paths.techCategoriesAdmin()}
        onDelete={deleteTechCategory}
      />
      <EditTechCategoryForm techCategory={techCategory} />
    </>
  );
};

export default TechCategoryEditPage;
