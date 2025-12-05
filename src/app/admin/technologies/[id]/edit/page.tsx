import { EditTechnologyForm, TechnologyOverviewHeader } from '@/components';
import { fetchTechnologiesSections, fetchTechnologyById } from '@/db/queries/technologies';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

  const technologySections = await fetchTechnologiesSections();

  return (
    <>
      <TechnologyOverviewHeader withEdit={false} itemId={params.id} />
      <EditTechnologyForm technology={technology} technologySections={technologySections} />
    </>
  );
};

export default TechnologyEditPage;
