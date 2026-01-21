import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { deleteTechStack } from '@/actions';
import { EditTechStackForm, OverviewHeader } from '@/components';
import paths from '@/paths';
import { fetchTechStackById } from '@/db/queries/tech-stacks';

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

  return (
    <>
      <OverviewHeader
        itemId={params.id}
        backPath={paths.techStacksAdmin()}
        onDelete={deleteTechStack}
      />
      <EditTechStackForm techStack={techStack} />
    </>
  );
};

export default TechStackEditPage;
