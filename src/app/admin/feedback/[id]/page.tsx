import { notFound } from "next/navigation";
import { Metadata } from "next";
import FeedbackOverviewHeader from "@/components/feedback-overview-header";
import FeedbackCard from "@/components/feedback-card";
import { fetchFeedbackById } from "@/db/queries/feedback";

interface FeedbackShowPageProps {
  params: {
    id: string;
  };
};

export function generateMetadata({ params: { id } }: FeedbackShowPageProps): Metadata {
  return {
    title: `Feedback - Details - ${id}`,
  };
};

const FeedbackShowPage = async ({ params }: FeedbackShowPageProps) => {
  const feedback = await fetchFeedbackById(params.id);

  if (!feedback) {
    return notFound();
  }

  return (
    <>
      <FeedbackOverviewHeader
        itemId={params.id}
      />
      <FeedbackCard
        feedback={feedback}
        withFeaturedFlag
        withSection
      />
    </>
  );
};

export default FeedbackShowPage;
