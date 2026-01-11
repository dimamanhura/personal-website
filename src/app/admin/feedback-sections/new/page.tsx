import { Metadata } from 'next';
import { OverviewHeader, CreateFeedbackSectionForm } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Feedback Section - New',
};

const FeedbackSectionsAddPage = () => {
  return (
    <>
      <OverviewHeader backPath={paths.feedbackSectionsAdmin()} />
      <CreateFeedbackSectionForm />
    </>
  );
};

export default FeedbackSectionsAddPage;
