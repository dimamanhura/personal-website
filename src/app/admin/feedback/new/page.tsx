import { Metadata } from 'next';
import { fetchReviewSections } from '@/db/queries/feedback';
import { CreateFeedbackForm, FeedbackOverviewHeader } from '@/components';

export const metadata: Metadata = {
  title: 'Feedback - New',
};

const FeedbackAddPage = async () => {
  const sections = await fetchReviewSections();
  return (
    <>
      <FeedbackOverviewHeader withEdit={false} withDelete={false} />
      <CreateFeedbackForm sections={sections} />
    </>
  );
};

export default FeedbackAddPage;
