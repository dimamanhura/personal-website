import { Project } from "@prisma/client";
import { SignificantProjectCard } from "@/components";

interface SignificantProjectsListProps {
  significantProjects: Project[];
};

export const SignificantProjectsList = ({ significantProjects }: SignificantProjectsListProps) => {
  return significantProjects.map(significantProject => {
    return (
      <SignificantProjectCard 
        significantProject={significantProject}
        key={significantProject.id}
      />
    );
  });
};
