import Link from 'next/link';
import { formatDateRange } from '@/utils';
import { Button, User } from '@nextui-org/react';
import { Project } from '@prisma/client';
import paths from '@/paths';
import { ItemsList, ChipsList } from '@/components';

interface SignificantProjectCardProps {
  significantProject: Project;
}

export const SignificantProjectCard = ({ significantProject }: SignificantProjectCardProps) => {
  const { shortDescription, position, achievements, logo, name, slug, startAt, endAt, stack } =
    significantProject;

  const renderLinkToProjectDetails = () => (
    <Button
      className="w-full print:hidden"
      color="primary"
      variant="flat"
      href={paths.projectBySlug(slug)}
      as={Link}
    >
      Details
    </Button>
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <User
          description={`${name}, ${formatDateRange(startAt, endAt)}`}
          avatarProps={{ src: logo, radius: 'md', size: 'lg', name: logo ? name : 'N/A' }}
          name={position}
        />
        <div className="hidden sm:block">{renderLinkToProjectDetails()}</div>
      </div>
      <p className="font-medium">{shortDescription}</p>
      <div className="my-2">
        {achievements.length > 0 && (
          <ItemsList items={achievements.map((achievement) => achievement.title)} />
        )}
      </div>
      <ChipsList chips={stack} />
      <div className="block sm:hidden mt-2 w-full">{renderLinkToProjectDetails()}</div>
    </div>
  );
};
