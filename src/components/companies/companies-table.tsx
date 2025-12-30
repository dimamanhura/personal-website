'use client';

import { FunctionComponent, useCallback } from 'react';
import { User } from '@nextui-org/react';
import { Company } from '@prisma/client';
import { deleteCompany } from '@/actions';
import { companiesColumns } from '@/columns';
import { ItemsTable, TableActions, TruncatedText } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';
import { formatDateRange } from '@/utils';

interface CompaniesTableTableProps {
  items: Company[];
  count: number;
}

export const CompaniesTable: FunctionComponent<CompaniesTableTableProps> = ({ items, count }) => {
  const renderCell = useCallback((company: Company, columnKey: ColumnKey<Company>) => {
    if (columnKey === 'actions') {
      return (
        <TableActions
          showPath={paths.companiesDetailsByIdAdmin}
          editPath={paths.companiesEditByIdAdmin}
          itemId={company.id}
          onDelete={deleteCompany}
        />
      );
    }

    switch (columnKey) {
      case 'id':
        return <TruncatedText text={company.id} />;

      case 'name':
        return (
          <User
            description={`${company.location.city}, ${company.location.country}`}
            avatarProps={{
              src: company.logo,
              size: 'sm',
              radius: 'md',
            }}
            name={company.name}
          />
        );

      case 'startAt':
        return formatDateRange(company.startAt, company.endAt);

      default:
        const value = company[columnKey];
        return typeof value === 'string' ? value : null;
    }
  }, []);

  return (
    <ItemsTable<Company>
      items={items}
      count={count}
      title={'Companies'}
      columns={companiesColumns}
      renderCell={renderCell}
    />
  );
};
