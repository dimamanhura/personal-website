import { User } from '@nextui-org/react';
import { TechStackWithTools } from '@/db/queries/tech-stacks';

interface TechStacksListProps {
  techStacks: TechStackWithTools[];
}

export const TechStacksList = ({ techStacks }: TechStacksListProps) => {
  return techStacks.map((techStack) => {
    const { tools, title, logo, id } = techStack;
    return (
      <User
        description={`${tools.map((tool) => tool.title).join(', ')}`}
        avatarProps={{ src: logo, radius: 'md' }}
        name={title}
        key={id}
      />
    );
  });
};
