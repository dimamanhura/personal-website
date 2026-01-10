import { Metadata } from 'next';
import { fetchReviewsBySection } from '@/db/queries/feedback';
import { FeedbackCard, Header } from '@/components';

export const metadata: Metadata = {
  title: 'Feedback',
  description:
    'Feedback from my colleagues and clients with whom I worked during my professional career',
  keywords: ['Feedback', 'Reviews'],
};

const FeedbackPage = async () => {
  const reviewsBySections = await fetchReviewsBySection();

  return (
    <>
      <Header title="Feedback" />
      <div className="flex w-full flex-col gap-12">
        {reviewsBySections.map((reviewsBySection) => {
          return (
            <section key={reviewsBySection.id}>
              <h2 className="mb-6 text-xl">{reviewsBySection.title}</h2>
              <div className="flex w-full flex-col gap-4">
                {reviewsBySection.reviews.map((feedback) => (
                  <FeedbackCard
                    feedback={{ ...feedback, feedbackSection: reviewsBySection }}
                    key={feedback.id}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default FeedbackPage;
