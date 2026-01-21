import { User } from '@nextui-org/react';
import { TechStackWithTools } from '@/db/queries/tech-stacks';
import { ChipsList } from '@/components';

interface TechStackCardProps {
  techStack: TechStackWithTools;
}

export const TechStackCard = ({ techStack }: TechStackCardProps) => {
  const tools = techStack.tools.map((tool) => tool.title);
  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <User
        avatarProps={{ src: techStack.logo, radius: 'md' }}
        name={techStack.title}
        description={techStack.category ? techStack.category.title : undefined}
      />
      {tools.length > 0 && <ChipsList vertical title="Tools" chips={tools} />}
    </div>
  );
};
