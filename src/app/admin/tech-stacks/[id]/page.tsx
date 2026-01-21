import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechStackById } from '@/db/queries/tech-stacks';
import { deleteTechStack } from '@/actions';
import { OverviewHeader, TechStackCard } from '@/components';
import paths from '@/paths';

interface TechStackShowPageShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: TechStackShowPageShowPageProps): Metadata {
  return {
    title: `Tech Stack - Details - ${id}`,
  };
}

const TechStackShowPage = async ({ params }: TechStackShowPageShowPageProps) => {
  const techStack = await fetchTechStackById(params.id);

  if (!techStack) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.techStacksAdmin()}
        itemId={params.id}
        editPath={paths.techStacksEditByIdAdmin(params.id)}
        onDelete={deleteTechStack}
      />
      <TechStackCard techStack={techStack} />
    </>
  );
};

export default TechStackShowPage;
