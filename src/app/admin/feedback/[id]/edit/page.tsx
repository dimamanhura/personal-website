import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchFeedbackById, fetchReviewSections } from '@/db/queries/feedback';
import { EditFeedbackForm, OverviewHeader } from '@/components';
import paths from '@/paths';
import { deleteFeedback } from '@/actions';

interface FeedbackEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: FeedbackEditPageProps): Metadata {
  return {
    title: `Feedback - Edit - ${id}`,
  };
}

const FeedbackEditPage = async ({ params }: FeedbackEditPageProps) => {
  const feedback = await fetchFeedbackById(params.id);

  if (!feedback) {
    return notFound();
  }

  const sections = await fetchReviewSections();

  return (
    <>
      <OverviewHeader
        itemId={params.id}
        backPath={paths.feedbackAdmin()}
        onDelete={deleteFeedback}
      />
      <EditFeedbackForm feedback={feedback} sections={sections} />
    </>
  );
};

export default FeedbackEditPage;
