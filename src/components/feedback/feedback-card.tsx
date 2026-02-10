import { Chip } from '@nextui-org/react';
import { ReviewWithFeedbackSection } from '@/db/queries/feedback';
import { FeaturedFlag } from '@/components';
import { formatDateFull } from '@/utils';

interface FeedbackCardProps {
  feedback: ReviewWithFeedbackSection;
  withFeaturedFlag?: boolean;
  withSection?: boolean;
}

export const FeedbackCard = ({ feedback, withFeaturedFlag, withSection }: FeedbackCardProps) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-medium">{feedback.author}</h4>
          <p className="text-sm text-foreground-400">{formatDateFull(feedback.receivedAt)}</p>
        </div>

        {(withSection || withFeaturedFlag) && (
          <div className="flex gap-2">
            {withSection && feedback.feedbackSection && (
              <Chip variant="flat" color="primary">
                {feedback.feedbackSection.title}
              </Chip>
            )}

            {withFeaturedFlag && <FeaturedFlag featured={feedback.featured} />}
          </div>
        )}
      </div>
      <p className="text-sm">{feedback.review}</p>
    </div>
  );
};
