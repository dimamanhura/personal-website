import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechnologyById } from '@/db/queries/technologies';
import { deleteTechnology } from '@/actions';
import { TechnologyCard, OverviewHeader } from '@/components';
import paths from '@/paths';

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
      <OverviewHeader
        backPath={paths.technologiesAdmin()}
        editPath={paths.technologiesEditByIdAdmin(params.id)}
        itemId={params.id}
        onDelete={deleteTechnology}
      />
      <TechnologyCard technology={technology} />
    </>
  );
};

export default TechnologyShowPage;
