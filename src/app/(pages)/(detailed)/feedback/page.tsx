import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchReviews } from '@/db/queries/feedback';
import { fetchAllFeedbackSections } from '@/db/queries/feedback-sections';
import { FeedbackFilterBySection, FeedbackList, FeedbackListLoading, Header } from '@/components';
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
  const { search: section, page } = await searchParams;

  const { items: reviews, count } = await fetchReviews({
    where: section && section !== 'all' ? { feedbackSection: { type: section } } : undefined,
    page: page ? parseInt(page) : 1,
  });

  const feedbackSections = await fetchAllFeedbackSections();

  return (
    <>
      <Header title="Feedback" />

      <FeedbackFilterBySection sections={feedbackSections} />

      <div className="flex w-full flex-col gap-4">
        <Suspense key={`${section || 'all'}-${page || '1'}`} fallback={<FeedbackListLoading />}>
          <FeedbackList section={section} page={page} />
        </Suspense>
      </div>
    </>
  );
};

export default FeedbackPage;
