import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechnologySectionById } from '@/db/queries/technology-sections';
import { deleteTechnologySection } from '@/actions';
import { EditTechnologySectionForm, OverviewHeader } from '@/components';
import paths from '@/paths';

interface TechnologySectionEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: TechnologySectionEditPageProps): Metadata {
  return {
    title: `Technology Sections - Edit - ${id}`,
  };
}

const TechnologySectionEditPage = async ({ params }: TechnologySectionEditPageProps) => {
  const technologySection = await fetchTechnologySectionById(params.id);

  if (!technologySection) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        itemId={params.id}
        backPath={paths.technologySectionsAdmin()}
        onDelete={deleteTechnologySection}
      />
      <EditTechnologySectionForm technologySection={technologySection} />
    </>
  );
};

export default TechnologySectionEditPage;
