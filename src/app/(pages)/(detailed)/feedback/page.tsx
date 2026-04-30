import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchAllFeedbackSections } from '@/db/queries/feedback-sections';
import {
  BackToAllLink,
  FeedbackFilterBySection,
  FeedbackList,
  FeedbackListLoading,
  Header,
} from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Feedback',
  description:
    'Feedback from my colleagues and clients with whom I worked during my professional career',
  keywords: ['Feedback', 'Reviews'],
};

interface FeedbackPageProps {
  searchParams: Promise<SearchParams>;
}

const FeedbackPage = async ({ searchParams }: FeedbackPageProps) => {
  const { search: section, id, page } = await searchParams;

  const feedbackSections = await fetchAllFeedbackSections();

  const key = `${section || 'all'}-${page || '1'}-${id || 'all'}`;

  return (
    <>
      {id ? (
        <BackToAllLink path={paths.feedback()} />
      ) : (
        <>
          <Header title="Feedback" />
          <FeedbackFilterBySection sections={feedbackSections} />
        </>
      )}

      <div className="flex w-full flex-col gap-4">
        <Suspense key={key} fallback={<FeedbackListLoading />}>
          <FeedbackList section={section} page={page} id={id} />
        </Suspense>
      </div>
    </>
  );
};

export default FeedbackPage;
