import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchFeedbackSectionById } from '@/db/queries/feedback-sections';
import { deleteFeedbackSection } from '@/actions';
import { EditFeedbackSectionForm, OverviewHeader } from '@/components';
import paths from '@/paths';

interface FeedbackSectionEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: FeedbackSectionEditPageProps): Metadata {
  return {
    title: `Feedback Section - Edit - ${id}`,
  };
}

const FeedbackSectionEditPage = async ({ params }: FeedbackSectionEditPageProps) => {
  const feedbackSection = await fetchFeedbackSectionById(params.id);

  if (!feedbackSection) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        itemId={params.id}
        backPath={paths.feedbackSectionsAdmin()}
        onDelete={deleteFeedbackSection}
      />
      <EditFeedbackSectionForm feedbackSection={feedbackSection} />
    </>
  );
};

export default FeedbackSectionEditPage;
