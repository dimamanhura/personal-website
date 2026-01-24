import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechStacks } from '@/db/queries/tech-stacks';
import { fetchTechToolById } from '@/db/queries/tech-tools';
import { deleteTechTool } from '@/actions';
import { EditTechToolForm, OverviewHeader } from '@/components';
import paths from '@/paths';

interface TechToolEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: TechToolEditPageProps): Metadata {
  return {
    title: `Tech Tools - Edit - ${id}`,
  };
}

const TechToolEditPage = async ({ params }: TechToolEditPageProps) => {
  const techTool = await fetchTechToolById(params.id);

  if (!techTool) {
    return notFound();
  }

  const techStacks = await fetchTechStacks({ all: true });

  return (
    <>
      <OverviewHeader
        backPath={paths.techToolsAdmin()}
        itemId={params.id}
        onDelete={deleteTechTool}
      />
      <EditTechToolForm techTool={techTool} techStacks={techStacks.items} />
    </>
  );
};

export default TechToolEditPage;
