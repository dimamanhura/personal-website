import { formatDateRange } from "@/utils/format-date-range";
import { User } from "@nextui-org/react";
import { Education } from "@prisma/client";

interface UniversitiesListProps {
  universities: Education[];
};

const UniversitiesList = ({ universities }: UniversitiesListProps) => {
  return universities.map(university => {
    const { title, logo, name, startAt, endAt, id } = university;
    return (
      <User
        description={`${title}, ${formatDateRange(startAt, endAt)}`}
        avatarProps={{ src: logo, isBordered: true, radius: 'md' }}
        name={name}
        key={id}
      />
    );
  });
};

export default UniversitiesList;
