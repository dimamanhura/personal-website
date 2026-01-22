import { ProjectWithTech } from '@/db/queries/projects';
import { SignificantProjectCard } from '@/components';

interface SignificantProjectsListProps {
  significantProjects: ProjectWithTech[];
}

export const SignificantProjectsList = ({ significantProjects }: SignificantProjectsListProps) => {
  return significantProjects.map((significantProject) => {
    return (
      <SignificantProjectCard significantProject={significantProject} key={significantProject.id} />
    );
  });
};
