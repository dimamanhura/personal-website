import { fetchReviewsBySection } from "@/db/queries/feedback";
import FeedbackCard from "@/components/feedback-card";
import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Feedback from my colleagues and clients with whom I worked during my professional career',
  keywords: ['Feedback', 'Reviews'],
};

const FeedbackPage = async () => {
  const reviewsBySections = await fetchReviewsBySection();

  return (
    <>
      <Header title="Feedback" />
      <div className="w-full flex flex-col gap-12">
        {reviewsBySections.map(reviewsBySection => {
          return (
            <section key={reviewsBySection.id}>
              <h2 className="text-xl mb-6">
                {reviewsBySection.title}
              </h2>
              <div className="w-full flex flex-col gap-4">
                {reviewsBySection.reviews.map(feedback => (
                  <FeedbackCard
                    feedback={feedback}
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
}

export default FeedbackPage;
