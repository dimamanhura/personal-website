import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechnologySectionById } from '@/db/queries/technology-sections';
import { TechnologySectionOverviewHeader, TechnologySectionCard } from '@/components';

interface TechnologySectionShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: TechnologySectionShowPageProps): Metadata {
  return {
    title: `Technology Sections - Details - ${id}`,
  };
}

const TechnologySectionShowPage = async ({ params }: TechnologySectionShowPageProps) => {
  const section = await fetchTechnologySectionById(params.id);

  if (!section) {
    return notFound();
  }

  return (
    <>
      <TechnologySectionOverviewHeader itemId={params.id} />
      <TechnologySectionCard section={section} />
    </>
  );
};

export default TechnologySectionShowPage;
