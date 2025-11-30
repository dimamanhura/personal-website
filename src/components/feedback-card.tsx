import { ReviewWithFeedbackSection } from "@/db/queries/feedback";
import { formatDateFull } from "@/utils/format-date-full";
import { Chip } from "@nextui-org/react";
import FeaturedFlag from "./featured-flag";

interface FeedbackCardProps {
  feedback: ReviewWithFeedbackSection;
  withFeaturedFlag?: boolean; 
  withSection?: boolean; 
};

const FeedbackCard = ({ feedback, withFeaturedFlag, withSection }: FeedbackCardProps) => {
  return (
    <div className="w-full flex flex-col gap-2 py-4 px-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-medium">
            {feedback.author}
          </h4>
          
          {withSection && (
            <Chip variant="flat" color="primary">
              {feedback.feedbackSection.title}
            </Chip>
          )}

          <p className="text-sm text-foreground-400">
            {formatDateFull(feedback.createdAt)}
          </p>
        </div>

        {withFeaturedFlag && (
          <FeaturedFlag featured={feedback.featured} />
        )}
      </div>
      
      <p className="text-sm">
        {feedback.review}
      </p>
    </div>
  );
};

export default FeedbackCard;
