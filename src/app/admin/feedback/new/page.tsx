import { Metadata } from 'next';
import { fetchAllFeedbackSections } from '@/db/queries/feedback-sections';
import { CreateFeedbackForm, OverviewHeader } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Feedback - New',
};

const FeedbackAddPage = async () => {
  const sections = await fetchAllFeedbackSections();
  return (
    <>
      <OverviewHeader backPath={paths.feedbackAdmin()} />
      <CreateFeedbackForm sections={sections} />
    </>
  );
};

export default FeedbackAddPage;
