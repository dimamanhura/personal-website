import { formatDateRange } from '@/utils';
import { Chip, User } from '@nextui-org/react';
import { Education } from '@prisma/client';
import { FaCalendar } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';

interface UniversityCardProps {
  university: Education;
}

export const UniversityCard = ({ university }: UniversityCardProps) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <div className="flex justify-between align-top">
        <User
          description={`${university.degree.charAt(0).toUpperCase() + university.degree.slice(1)} in ${university.title}`}
          avatarProps={{
            src: university.logo,
            size: 'md',
            radius: 'md',
          }}
          name={university.name}
        />

        <Chip className="text-sm" variant="flat" color="primary" size="md">
          <span className="flex items-center gap-2">
            <FaCalendar size={12} />
            {formatDateRange(university.startAt, university.endAt)}
          </span>
        </Chip>
      </div>

      <Chip className="text-sm" variant="flat" color="primary" size="md">
        <span className="flex items-center gap-2">
          <FaLocationPin size={12} />
          {university.location.city}, {university.location.country}
        </span>
      </Chip>
    </div>
  );
};
