import { Button, User } from '@nextui-org/react';
import { Project } from '@prisma/client';
import Link from 'next/link';
import { formatDateRange } from '@/utils/format-date-range';
import { ChipsList, ItemsList } from '@/components';
import paths from '@/paths';

interface SignificantProjectCardProps {
  significantProject: Project;
}

const SignificantProjectCard = ({ significantProject }: SignificantProjectCardProps) => {
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
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <User
          description={`${name}, ${formatDateRange(startAt, endAt)}`}
          avatarProps={{ src: logo || '', radius: 'md', size: 'lg', name: logo ? name : 'N/A' }}
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
      <div className="mt-2 block w-full sm:hidden">{renderLinkToProjectDetails()}</div>
    </div>
  );
};

export default SignificantProjectCard;
