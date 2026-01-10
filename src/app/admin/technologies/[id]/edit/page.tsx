import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechnologyById } from '@/db/queries/technologies';
import { fetchTechnologySections } from '@/db/queries/technology-sections';
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

  const technologySections = await fetchTechnologySections({ all: true });

  return (
    <>
      <OverviewHeader
        backPath={paths.technologiesAdmin()}
        itemId={params.id}
        onDelete={deleteTechnology}
      />
      <EditTechnologyForm technology={technology} technologySections={technologySections.items} />
    </>
  );
};

export default TechnologyEditPage;
