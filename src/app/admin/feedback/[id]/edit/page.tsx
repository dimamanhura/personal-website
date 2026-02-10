import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchFeedbackById } from '@/db/queries/feedback';
import { fetchAllFeedbackSections } from '@/db/queries/feedback-sections';
import { deleteFeedback } from '@/actions';
import { EditFeedbackForm, OverviewHeader } from '@/components';
import paths from '@/paths';

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

  const sections = await fetchAllFeedbackSections();

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
