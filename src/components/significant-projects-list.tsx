import { Project } from "@prisma/client";
import SignificantProjectCard from "./significant-project-card";

interface SignificantProjectsListProps {
  significantProjects: Project[];
};

const SignificantProjectsList = ({ significantProjects }: SignificantProjectsListProps) => {
  return significantProjects.map(significantProject => {
    return (
      <SignificantProjectCard 
        significantProject={significantProject}
        key={significantProject.id}
      />
    );
  });
};

export default SignificantProjectsList;
