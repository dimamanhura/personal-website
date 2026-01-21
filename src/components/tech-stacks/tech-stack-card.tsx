import { User } from '@nextui-org/react';
import { TechStackWithTechnologies } from '@/db/queries/tech-stacks';
import { ChipsList } from '@/components';

interface TechStackCardProps {
  techStack: TechStackWithTechnologies;
}

export const TechStackCard = ({ techStack }: TechStackCardProps) => {
  const technologies = techStack.technologies.map((technology) => technology.title);
  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <User avatarProps={{ src: techStack.logo, radius: 'md' }} name={techStack.title} />
      {technologies.length > 0 && <ChipsList vertical title="Technologies" chips={technologies} />}
    </div>
  );
};
