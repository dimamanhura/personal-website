import { Metadata } from 'next';
import { fetchFeedbackSections } from '@/db/queries/feedback-sections';
import {
  AddItemButton,
  FeedbackSectionsImportButton,
  FeedbackSectionsTable,
  Header,
} from '@/components';
import paths from '@/paths';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Feedback Sections',
};

interface FeedbackSectionsAdminPageProps {
  searchParams: Promise<SearchParams>;
}

const FeedbackSectionsAdminPage = async ({ searchParams }: FeedbackSectionsAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchFeedbackSections({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header
        title={metadata.title as string}
        renderActions={() => (
          <>
            <AddItemButton path={paths.feedbackSectionsNewAdmin()} />
            <FeedbackSectionsImportButton />
          </>
        )}
      />

      <FeedbackSectionsTable items={items} count={count} />
    </>
  );
};

export default FeedbackSectionsAdminPage;
