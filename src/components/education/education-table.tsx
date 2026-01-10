'use client';

import { FunctionComponent, useCallback } from 'react';
import { User } from '@nextui-org/react';
import { Education } from '@prisma/client';
import { deleteEducation } from '@/actions';
import { educationColumns } from '@/columns';
import { ItemsTable, TableActions, TruncatedText } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';
import { formatDateRange } from '@/utils';

interface EducationTableProps {
  items: Education[];
  count: number;
}

export const EducationTable: FunctionComponent<EducationTableProps> = ({ items, count }) => {
  const renderCell = useCallback((education: Education, columnKey: ColumnKey<Education>) => {
    if (columnKey === 'actions') {
      return (
        <TableActions
          showPath={paths.educationDetailsByIdAdmin}
          editPath={paths.educationEditByIdAdmin}
          itemId={education.id}
          onDelete={deleteEducation}
        />
      );
    }

    switch (columnKey) {
      case 'id':
        return <TruncatedText text={education.id} />;

      case 'name':
        return (
          <User
            description={education.title}
            avatarProps={{
              src: education.logo,
              size: 'sm',
              radius: 'md',
            }}
            name={education.name}
          />
        );

      case 'location':
        return (
          <span>
            {education.location.city}, {education.location.country}
          </span>
        );

      case 'startAt':
        return formatDateRange(education.startAt, education.endAt);

      default:
        const value = education[columnKey];
        return typeof value === 'string' ? value : null;
    }
  }, []);

  return (
    <ItemsTable<Education>
      items={items}
      count={count}
      title={'Education'}
      columns={educationColumns}
      renderCell={renderCell}
    />
  );
};
