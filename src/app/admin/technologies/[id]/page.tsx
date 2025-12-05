import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TechnologyOverviewHeader } from "@/components";
import { fetchTechnologyById } from "@/db/queries/technologies";

interface TechnologyShowPageProps {
  params: {
    id: string;
  };
};

export function generateMetadata({ params: { id } }: TechnologyShowPageProps): Metadata {
  return {
    title: `Technologies - Details - ${id}`,
  };
};

const TechnologyShowPage = async ({ params }: TechnologyShowPageProps) => {
  const technology = await fetchTechnologyById(params.id);

  if (!technology) {
    return notFound();
  }

  return (
    <>
      <TechnologyOverviewHeader itemId={params.id} />
    </>
  );
};

export default TechnologyShowPage;
