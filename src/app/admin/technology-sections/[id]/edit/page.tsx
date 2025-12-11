import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechnologyById } from '@/db/queries/technologies';
import { fetchTechnologySections } from '@/db/queries/technology-sections';
import { EditTechnologyForm, TechnologyOverviewHeader } from '@/components';

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
      <TechnologyOverviewHeader withEdit={false} itemId={params.id} />
      <EditTechnologyForm technology={technology} technologySections={technologySections.items} />
    </>
  );
};

export default TechnologyEditPage;
