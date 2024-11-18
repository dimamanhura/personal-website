import { Feedback } from "@prisma/client";
import FeedbackCard from "./feedback-card";

interface FeaturedReviewsListProps {
  featuredReviews: Feedback[];
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
