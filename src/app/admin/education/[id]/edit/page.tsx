import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchUniversityById } from '@/db/queries/education';
import { deleteEducation } from '@/actions';
import { EditEducationForm, OverviewHeader } from '@/components';
import paths from '@/paths';

interface EducationEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: EducationEditPageProps): Metadata {
  return {
    title: `Education - Edit - ${id}`,
  };
}

const EducationEditPage = async ({ params }: EducationEditPageProps) => {
  const education = await fetchUniversityById(params.id);

  if (!education) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.educationAdmin()}
        itemId={params.id}
        onDelete={deleteEducation}
      />
      <EditEducationForm education={education} />
    </>
  );
};

export default EducationEditPage;
