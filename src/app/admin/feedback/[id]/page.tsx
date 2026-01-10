import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchFeedbackById } from '@/db/queries/feedback';
import { deleteFeedback } from '@/actions';
import { FeedbackCard, OverviewHeader } from '@/components';
import paths from '@/paths';

interface FeedbackShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: FeedbackShowPageProps): Metadata {
  return {
    title: `Feedback - Details - ${id}`,
  };
}

const FeedbackShowPage = async ({ params }: FeedbackShowPageProps) => {
  const feedback = await fetchFeedbackById(params.id);

  if (!feedback) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.feedbackAdmin()}
        itemId={params.id}
        editPath={paths.feedbackEditByIdAdmin(params.id)}
        onDelete={deleteFeedback}
      />
      <FeedbackCard feedback={feedback} withFeaturedFlag withSection />
    </>
  );
};

export default FeedbackShowPage;
