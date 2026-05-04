import { fetchReviews } from '@/db/queries/feedback';
import { FeedbackCard, FeedbackListPagination } from '@/components';

export const FeedbackList = async ({
  section,
  page,
  id,
}: {
  section?: string;
  page?: string;
  id?: string;
}) => {
  const whereClause = id
    ? { id }
    : section && section !== 'all'
      ? { feedbackSection: { type: section } }
      : undefined;

  const { items: reviews, count } = await fetchReviews({
    where: whereClause,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        {reviews.map((feedback) => (
          <FeedbackCard withSection feedback={feedback} key={feedback.id} />
        ))}
      </div>

      {!id && <FeedbackListPagination totalCount={count} page={Number(page) || 1} />}
    </>
  );
};
