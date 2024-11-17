import Link from "next/link";
import { formatDateRange } from "@/utils/format-date-range";
import { Chip, User } from "@nextui-org/react";
import { Project } from "@prisma/client";
import { FaCircle } from "react-icons/fa";
import paths from "@/paths";

interface SignificantProjectsListProps {
  significantProjects: Project[];
};

const SignificantProjectsList = ({ significantProjects }: SignificantProjectsListProps) => {
  return significantProjects.map(significantProject => {
    const { shortDescription, position, achievements, logo, name, slug, startAt, endAt, stack, id } = significantProject;
    return (
      <div className="w-full flex flex-col gap-2" key={id}>
        <Link href={paths.projectBySlug(slug)}>
          <User
            description={`${name}, ${formatDateRange(startAt, endAt)}`}
            avatarProps={{ src: logo, radius: 'md', size: 'lg' }}
            name={position}
          />
        </Link>
        <p className="font-medium">
          {shortDescription}
        </p>
        <ul className="mt-2">
          {achievements.map((achievement, index) => (
            <li className="pl-4 flex items-center text-sm text-foreground-400" key={index}>
              <FaCircle className="text-black mr-2 text-[4px]" />
              <span>{achievement.title}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 mt-2">
          {stack.map((technology, index) => (
            <Chip key={index} size="sm" variant="flat">{technology}</Chip>
          ))}
        </div>
      </div>
    );
  });
};

export default SignificantProjectsList;
