import Header from "@/components/header";
import SignificantProjectCard from "@/components/significant-project-card";
import { fetchSignificantProjects } from "@/db/queries/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Significant Projects',
  description: 'Feedback from my colleagues and clients with whom I worked during my professional career',
  keywords: ['Projects', 'Portfolio', 'Significant', 'Career'],
};

const ProjectsPage = async () => {
  const significantProjects = await fetchSignificantProjects();
  return (
    <>
      <Header title="Significant Projects" />
      <div className="w-full flex flex-col gap-6">
        {significantProjects.map(significantProject => (
          <SignificantProjectCard
            significantProject={significantProject}
            key={significantProject.id}
          />
        ))}
      </div>
    </>
  );
}

export default ProjectsPage;
