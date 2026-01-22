import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechCategories } from '@/db/queries/tech-categories';
import { fetchTechStackById } from '@/db/queries/tech-stacks';
import { deleteTechStack } from '@/actions';
import { EditTechStackForm, OverviewHeader } from '@/components';
import paths from '@/paths';

interface TechStackEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: TechStackEditPageProps): Metadata {
  return {
    title: `Tech Stack - Edit - ${id}`,
  };
}

const TechStackEditPage = async ({ params }: TechStackEditPageProps) => {
  const techStack = await fetchTechStackById(params.id);

  if (!techStack) {
    return notFound();
  }

  const categories = await fetchTechCategories({ all: true });

  return (
    <>
      <OverviewHeader
        itemId={params.id}
        backPath={paths.techStacksAdmin()}
        onDelete={deleteTechStack}
      />
      <EditTechStackForm categories={categories.items} techStack={techStack} />
    </>
  );
};

export default TechStackEditPage;
