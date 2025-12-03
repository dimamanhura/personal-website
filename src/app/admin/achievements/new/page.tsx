import AchievementOverviewHeader from "@/components/achievement-overview-header";
import CreateFeedbackForm from "@/components/create-feedback-form";
import { fetchReviewSections } from "@/db/queries/feedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Feedback - New',
};

const FeedbackAddPage = async () => {
  const sections = await fetchReviewSections();
  return (
    <>
      <AchievementOverviewHeader withEdit={false} withDelete={false} />
      <CreateFeedbackForm sections={sections} />
    </>
  );
};

export default FeedbackAddPage;
