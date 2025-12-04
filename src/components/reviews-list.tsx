import { FeedbackCard } from "@/components";
import { ReviewWithFeedbackSection } from "@/db/queries/feedback";

interface ReviewListProps {
  featuredReviews: ReviewWithFeedbackSection[];
};

export const ReviewList = ({ featuredReviews }: ReviewListProps) => {
  return featuredReviews.map(feedback => {
    return (
      <FeedbackCard
        feedback={feedback}
        key={feedback.id}
      />
    );
  });
};
