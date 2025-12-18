import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OverviewHeader, UniversityCard } from '@/components';
import { fetchUniversityById } from '@/db/queries/education';
import paths from '@/paths';
import { deleteEducation } from '@/actions';

interface EducationShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: EducationShowPageProps): Metadata {
  return {
    title: `Education - Details - ${id}`,
  };
}

const EducationShowPage = async ({ params }: EducationShowPageProps) => {
  const university = await fetchUniversityById(params.id);

  if (!university) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.educationAdmin()}
        editPath={paths.educationEditByIdAdmin(params.id)}
        itemId={params.id}
        onDelete={deleteEducation}
      />
      <UniversityCard university={university} />
    </>
  );
};

export default EducationShowPage;
