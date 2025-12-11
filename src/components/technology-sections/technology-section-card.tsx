import { User } from '@nextui-org/react';
import { TechnologySectionWithTechnologies } from '@/db/queries/technology-sections';
import { ChipsList } from '@/components';

interface TechnologySectionCardProps {
  section: TechnologySectionWithTechnologies;
}

export const TechnologySectionCard = ({ section }: TechnologySectionCardProps) => {
  const technologies = section.technologies.map((technology) => technology.title);
  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <User avatarProps={{ src: section.logo, radius: 'md' }} name={section.title} />
      {technologies.length > 0 && <ChipsList vertical title="Technologies" chips={technologies} />}
    </div>
  );
};
