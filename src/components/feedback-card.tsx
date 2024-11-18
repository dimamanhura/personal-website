import { formatDateFull } from "@/utils/format-date-full";
import { Feedback } from "@prisma/client";

interface FeedbackCardProps {
  feedback: Feedback;
};

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  return (
    <div className="w-full flex flex-col gap-2 py-4 px-6 bg-zinc-100 rounded-lg">
      <div className="flex flex-col gap-1">
        <h4 className="text-lg font-medium">
          {feedback.author}
        </h4>
        <p className="text-sm text-foreground-400">
          {formatDateFull(feedback.createdAt)}
        </p>
      </div>
      <p className="text-sm">
        {feedback.review}
      </p>
    </div>
  );
};

export default FeedbackCard;
