import FeedbackCard from "./feedback-card";
import { ReviewWithFeedbackSection } from "@/db/queries/feedback";

interface FeaturedReviewsListProps {
  featuredReviews: ReviewWithFeedbackSection[];
};

const FeaturedReviewsList = ({ featuredReviews }: FeaturedReviewsListProps) => {
  return featuredReviews.map(feedback => {
    return (
      <FeedbackCard
        feedback={feedback}
        key={feedback.id}
      />
    );
  });
};

export default FeaturedReviewsList;
