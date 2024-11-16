import { Feedback } from "@prisma/client";

interface FeaturedReviewsListProps {
  featuredReviews: Feedback[];
};

const FeaturedReviewsList = ({ featuredReviews }: FeaturedReviewsListProps) => {
  return featuredReviews.map(featuredReview => {
    const { review, id } = featuredReview;
    return (
      <div className="w-full py-4 px-6 bg-zinc-100 rounded-lg" key={id}>
        {review}
      </div>
    );
  });
};

export default FeaturedReviewsList;
