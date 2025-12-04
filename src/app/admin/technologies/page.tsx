import { Header, TechnologiesTable } from "@/components";
import { fetchTechnologies } from "@/db/queries/technologies";
import paths from "@/paths";
import { SearchParams } from "@/types";
import { Button } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Technologies',
};

interface TechnologiesAdminPageProps {
  searchParams: Promise<SearchParams>
};

const TechnologiesAdminPage = async ({ searchParams }: TechnologiesAdminPageProps) => {
  const { page, sortBy, order } = await searchParams;

  const { count, items } = await fetchTechnologies({
    orderBy: sortBy && order ? { column: sortBy, direction: order } : undefined,
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Header
        title={metadata.title as string}
        renderActions={() => (
          <Button color="primary" variant="flat" as={Link} href={paths.addTechnology()}>
            Add Technology
          </Button>
        )}
      />

      <TechnologiesTable
        items={items}
        count={count}
      />
    </>
  );
};

export default TechnologiesAdminPage;
