import Link from "next/link";
import { formatDateRange } from "@/utils/format-date-range";
import { Button, Chip, User } from "@nextui-org/react";
import { Project } from "@prisma/client";
import { FaCircle } from "react-icons/fa";
import paths from "@/paths";

interface SignificantProjectCardProps {
  significantProject: Project;
};

const SignificantProjectCard = ({ significantProject }: SignificantProjectCardProps) => {
  const { shortDescription, position, achievements, logo, name, slug, startAt, endAt, stack } = significantProject;

  const renderLinkToProjectDetails = () => (
    <Button
      className="w-full"
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
          avatarProps={{ src: logo, radius: 'md', size: 'lg' }}
          name={position}
        />
        <div className="hidden sm:block">
          {renderLinkToProjectDetails()}
        </div>
      </div>
      <p className="font-medium">
        {shortDescription}
      </p>
      {achievements.length > 0 && (
        <ul className="mt-2">
          {achievements.map((achievement, index) => (
            <li className="pl-4 flex items-center text-sm text-foreground-400" key={index}>
              <FaCircle className="text-black mr-2 text-[4px] flex-shrink-0" />
              <span>{achievement.title}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-4 mt-2">
        {stack.map((technology, index) => (
          <Chip key={index} size="sm" variant="flat">{technology}</Chip>
        ))}
      </div>
      <div className="block sm:hidden mt-2 w-full">
        {renderLinkToProjectDetails()}
      </div>
    </div>
  );
};

export default SignificantProjectCard;
