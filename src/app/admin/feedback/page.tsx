import { Metadata } from 'next';
import { fetchReviews } from '@/db/queries/feedback';
import { AddItemButton, FeedbackImportButton, FeedbackTable, Header } from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Feedback',
};

interface FeedbackAdminPageProps {
  searchParams: Promise<SearchParams>;
}

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
          <>
            <AddItemButton path={paths.feedbackNewAdmin()} />
            <FeedbackImportButton />
          </>
        )}
      />

      <FeedbackTable items={items} count={count} />
    </>
  );
};

export default FeedbackAdminPage;
