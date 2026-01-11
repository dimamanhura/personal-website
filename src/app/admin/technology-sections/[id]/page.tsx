import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTechnologySectionById } from '@/db/queries/technology-sections';
import { deleteTechnologySection } from '@/actions';
import { OverviewHeader, TechnologySectionCard } from '@/components';
import paths from '@/paths';

interface TechnologySectionShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: TechnologySectionShowPageProps): Metadata {
  return {
    title: `Technology Section - Details - ${id}`,
  };
}

const TechnologySectionShowPage = async ({ params }: TechnologySectionShowPageProps) => {
  const section = await fetchTechnologySectionById(params.id);

  if (!section) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.technologySectionsAdmin()}
        itemId={params.id}
        editPath={paths.technologySectionsEditByIdAdmin(params.id)}
        onDelete={deleteTechnologySection}
      />
      <TechnologySectionCard section={section} />
    </>
  );
};

export default TechnologySectionShowPage;
