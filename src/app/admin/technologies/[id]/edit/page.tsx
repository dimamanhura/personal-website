import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechnologyById } from '@/db/queries/technologies';
import { fetchTechStacks } from '@/db/queries/tech-stacks';
import { deleteTechnology } from '@/actions';
import { EditTechnologyForm, OverviewHeader } from '@/components';
import paths from '@/paths';

interface TechnologyEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: TechnologyEditPageProps): Metadata {
  return {
    title: `Technologies - Edit - ${id}`,
  };
}

const TechnologyEditPage = async ({ params }: TechnologyEditPageProps) => {
  const technology = await fetchTechnologyById(params.id);

  if (!technology) {
    return notFound();
  }

  const techStacks = await fetchTechStacks({ all: true });

  return (
    <>
      <OverviewHeader
        backPath={paths.technologiesAdmin()}
        itemId={params.id}
        onDelete={deleteTechnology}
      />
      <EditTechnologyForm technology={technology} techStacks={techStacks.items} />
    </>
  );
};

export default TechnologyEditPage;
