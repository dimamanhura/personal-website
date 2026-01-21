import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechToolById } from '@/db/queries/tech-tools';
import { deleteTechTool } from '@/actions';
import { TechToolCard, OverviewHeader } from '@/components';
import paths from '@/paths';

interface TechToolShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: TechToolShowPageProps): Metadata {
  return {
    title: `Tech Tools - Details - ${id}`,
  };
}

const TechToolShowPage = async ({ params }: TechToolShowPageProps) => {
  const techTool = await fetchTechToolById(params.id);

  if (!techTool) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.techToolsAdmin()}
        editPath={paths.techToolsEditByIdAdmin(params.id)}
        itemId={params.id}
        onDelete={deleteTechTool}
      />
      <TechToolCard techTool={techTool} />
    </>
  );
};

export default TechToolShowPage;
