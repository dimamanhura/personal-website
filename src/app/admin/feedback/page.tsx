import { FeedbackTable, Header } from "@/components";
import { fetchReviews } from "@/db/queries/feedback";
import paths from "@/paths";
import { SearchParams } from "@/types";
import { Button } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Feedback',
};

interface FeedbackAdminPageProps {
  searchParams: Promise<SearchParams>
};

const FeedbackAdminPage = async ({ searchParams }: FeedbackAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchReviews({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header
        title={metadata.title as string}
        renderActions={() => (
          <Button color="primary" variant="flat" as={Link} href={paths.addFeedback()}>
            Add Feedback
          </Button>
        )}
      />

      <FeedbackTable
        items={items}
        count={count}
      />
    </>
  );
};

export default FeedbackAdminPage;
