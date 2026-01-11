import { FeedbackSectionWithReviews } from '@/db/queries/feedback-sections';
import { ItemsCount } from '@/components';

interface FeedbackSectionCardProps {
  feedbackSection: FeedbackSectionWithReviews;
}

export const FeedbackSectionCard = ({ feedbackSection }: FeedbackSectionCardProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <h3 className="text-xl font-medium">{feedbackSection.title}</h3>
      <p className="text-sm">{feedbackSection.type}</p>
      <ItemsCount count={feedbackSection.reviews.length} label="Reviews" />
    </div>
  );
};
