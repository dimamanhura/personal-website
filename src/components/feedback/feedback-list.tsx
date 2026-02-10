import { fetchReviews } from '@/db/queries/feedback';
import { FeedbackCard, FeedbackListPagination } from '@/components';

export const FeedbackList = async ({ section, page }: { section?: string; page?: string }) => {
  const { items: reviews, count } = await fetchReviews({
    where: section && section !== 'all' ? { feedbackSection: { type: section } } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        {reviews.map((feedback) => (
          <FeedbackCard withSection feedback={feedback} key={feedback.id} />
        ))}
      </div>

      <FeedbackListPagination totalCount={count} page={Number(page) || 1} />
    </>
  );
};
