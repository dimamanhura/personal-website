import EditFeedbackForm from "@/components/edit-feedback-form";
import FeedbackOverviewHeader from "@/components/feedback-overview-header";
import { fetchFeedbackById, fetchReviewSections } from "@/db/queries/feedback";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface FeedbackEditPageProps {
  params: { id: string };
};

export function generateMetadata({ params: { id } }: FeedbackEditPageProps): Metadata {
  return {
    title: `Feedback - Edit - ${id}`,
  };
};

const FeedbackEditPage = async ({ params }: FeedbackEditPageProps) => {
  const feedback = await fetchFeedbackById(params.id);

  if (!feedback) {
    return notFound();
  }

  const sections = await fetchReviewSections();

  return (
    <>
      <FeedbackOverviewHeader
        withEdit={false}
        itemId={params.id}
      />
      <EditFeedbackForm
        feedback={feedback}
        sections={sections}
      />
    </>
  );
};

export default FeedbackEditPage;
