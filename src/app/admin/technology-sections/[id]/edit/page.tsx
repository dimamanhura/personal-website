import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechnologySectionById } from '@/db/queries/technology-sections';
import { EditTechnologySectionForm, TechnologySectionOverviewHeader } from '@/components';

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
      <TechnologySectionOverviewHeader withEdit={false} itemId={params.id} />
      <EditTechnologySectionForm technologySection={technologySection} />
    </>
  );
};

export default TechnologySectionEditPage;
