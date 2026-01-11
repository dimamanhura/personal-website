import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchFeedbackSectionById } from '@/db/queries/feedback-sections';
import { deleteFeedbackSection } from '@/actions';
import { FeedbackSectionCard, OverviewHeader } from '@/components';
import paths from '@/paths';

interface FeedbackSectionShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: FeedbackSectionShowPageProps): Metadata {
  return {
    title: `Feedback Section - Details - ${id}`,
  };
}

const FeedbackSectionShowPage = async ({ params }: FeedbackSectionShowPageProps) => {
  const feedbackSection = await fetchFeedbackSectionById(params.id);

  if (!feedbackSection) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.feedbackSectionsAdmin()}
        itemId={params.id}
        editPath={paths.feedbackSectionsEditByIdAdmin(params.id)}
        onDelete={deleteFeedbackSection}
      />
      <FeedbackSectionCard feedbackSection={feedbackSection} />
    </>
  );
};

export default FeedbackSectionShowPage;
