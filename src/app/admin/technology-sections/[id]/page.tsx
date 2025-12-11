import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechnologyById } from '@/db/queries/technologies';
import { TechnologyCard, TechnologyOverviewHeader } from '@/components';

interface TechnologyShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: TechnologyShowPageProps): Metadata {
  return {
    title: `Technologies - Details - ${id}`,
  };
}

const TechnologyShowPage = async ({ params }: TechnologyShowPageProps) => {
  const technology = await fetchTechnologyById(params.id);

  if (!technology) {
    return notFound();
  }

  return (
    <>
      <TechnologyOverviewHeader itemId={params.id} />
      <TechnologyCard technology={technology} />
    </>
  );
};

export default TechnologyShowPage;
