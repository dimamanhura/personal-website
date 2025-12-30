'use client';

import { FunctionComponent, useCallback } from 'react';
import { User } from '@nextui-org/react';
import { Meta } from '@prisma/client';
import { deleteProfile } from '@/actions';
import { profileColumns } from '@/columns';
import { ItemsTable, TableActions, TruncatedText } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';

interface ProfileTableTableProps {
  items: Meta[];
  count: number;
}

export const ProfileTable: FunctionComponent<ProfileTableTableProps> = ({ items, count }) => {
  const renderCell = useCallback((profile: Meta, columnKey: ColumnKey<Meta>) => {
    if (columnKey === 'actions') {
      return (
        <TableActions
          showPath={paths.profileDetailsByIdAdmin}
          editPath={paths.profileEditByIdAdmin}
          itemId={profile.id}
          onDelete={deleteProfile}
        />
      );
    }

    switch (columnKey) {
      case 'id':
        return <TruncatedText text={profile.id} />;

      case 'firstName':
        return (
          <User
            description={profile.title}
            avatarProps={{
              src: profile.avatar,
              size: 'sm',
              radius: 'md',
            }}
            name={`${profile.firstName} ${profile.lastName}`}
          />
        );

      case 'location':
        return (
          <span>
            {profile.location.city}, {profile.location.country}
          </span>
        );

      default:
        const value = profile[columnKey];
        return typeof value === 'string' ? value : null;
    }
  }, []);

  return (
    <ItemsTable<Meta>
      items={items}
      count={count}
      title={'Profile'}
      columns={profileColumns}
      renderCell={renderCell}
    />
  );
};
