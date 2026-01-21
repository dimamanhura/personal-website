import { User } from '@nextui-org/react';
import { TechStackWithTechnologies } from '@/db/queries/tech-stacks';

interface TechStacksListProps {
  techStacks: TechStackWithTechnologies[];
}

export const TechStacksList = ({ techStacks }: TechStacksListProps) => {
  return techStacks.map((techStack) => {
    const { technologies, title, logo, id } = techStack;
    return (
      <User
        description={`${technologies.map((technology) => technology.title).join(', ')}`}
        avatarProps={{ src: logo, radius: 'md' }}
        name={title}
        key={id}
      />
    );
  });
};
