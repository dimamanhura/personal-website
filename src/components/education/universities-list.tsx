import { User } from '@nextui-org/react';
import { Education } from '@prisma/client';
import { formatDateRange } from '@/utils';

interface UniversitiesListProps {
  universities: Education[];
}

export const UniversitiesList = ({ universities }: UniversitiesListProps) => {
  return universities.map((university) => {
    const { title, logo, name, startAt, endAt, id } = university;
    return (
      <User
        description={`${title}, ${formatDateRange(startAt, endAt)}`}
        avatarProps={{ src: logo, radius: 'md' }}
        name={name}
        key={id}
      />
    );
  });
};
