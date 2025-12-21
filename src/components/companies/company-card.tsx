import { formatDateRange } from '@/utils';
import { Chip, User } from '@nextui-org/react';
import { Company, Position } from '@prisma/client';
import { FaBriefcase, FaCalendar } from 'react-icons/fa';
import { ItemsList } from '../ui/items-list';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  const getPositionLabel = (position: Position) => (
    <div className="flex gap-2">
      <span>{position.title}</span>
      <span>({formatDateRange(company.startAt, company.endAt)})</span>
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <div className="flex justify-between align-top">
        <User
          description={`${company.location.city}, ${company.location.country}`}
          avatarProps={{
            src: company.logo,
            size: 'md',
            radius: 'md',
          }}
          name={company.name}
        />

        <Chip className="text-sm" variant="flat" color="primary" size="md">
          <span className="flex items-center gap-2">
            <FaCalendar size={12} />
            {formatDateRange(company.startAt, company.endAt)}
          </span>
        </Chip>
      </div>

      <Chip className="text-sm" variant="flat" color="primary" size="md">
        <span className="flex items-center gap-2">
          <FaBriefcase size={12} />
          {company.position}
        </span>
      </Chip>

      {company.reasonsOfLeaving.length > 0 && (
        <ItemsList items={company.positions} getLabel={getPositionLabel as never} />
      )}

      {company.reasonsOfLeaving.length > 0 && (
        <ItemsList title="Reasons of Leaving" items={company.reasonsOfLeaving} />
      )}
    </div>
  );
};
