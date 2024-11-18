import { Feedback } from "@prisma/client";

interface FeedbackCardProps {
  feedback: Feedback;
};

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  return (
    <div className="w-full py-4 px-6 bg-zinc-100 rounded-lg">
      {feedback.review}
    </div>
  );
};

export default FeedbackCard;
