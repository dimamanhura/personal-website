import { Metadata } from 'next';
import { fetchReviewSections } from '@/db/queries/feedback';
import { CreateFeedbackForm, OverviewHeader } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Feedback - New',
};

const FeedbackAddPage = async () => {
  const sections = await fetchReviewSections();
  return (
    <>
      <OverviewHeader backPath={paths.feedbackAdmin()} />
      <CreateFeedbackForm sections={sections} />
    </>
  );
};

export default FeedbackAddPage;
