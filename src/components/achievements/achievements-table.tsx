'use client';

import { FunctionComponent, useCallback } from 'react';
import { ItemsTable, TableActions, TruncatedText, FeaturedFlag, ItemsCount } from '@/components';
import paths from '@/paths';
import { Achievement } from '@prisma/client';
import { deleteAchievement } from '@/actions';
import { ColumnKey } from '@/types';
import { achievementsColumns } from '@/columns';

interface AchievementsTableProps {
  items: Achievement[];
  count: number;
}

export const AchievementsTable: FunctionComponent<AchievementsTableProps> = ({ items, count }) => {
  const renderCell = useCallback((achievement: Achievement, columnKey: ColumnKey<Achievement>) => {
    if (columnKey === 'actions') {
      return (
        <TableActions
          showPath={paths.achievementsDetails}
          editPath={paths.editAchievement}
          itemId={achievement.id}
          onDelete={deleteAchievement}
        />
      );
    }

    switch (columnKey) {
      case 'id':
        return <TruncatedText text={achievement.id} />;

      case 'title':
        return <TruncatedText text={achievement.title} maxLength={30} />;

      case 'description':
        return <TruncatedText text={achievement.description} maxLength={30} />;

      case 'solution':
        return <ItemsCount count={achievement.solution.length} label="Solution" />;

      case 'result':
        return <ItemsCount count={achievement.result.length} label="Result" />;

      case 'notes':
        return <ItemsCount count={achievement.notes.length} label="Notes" />;

      case 'featured':
        return <FeaturedFlag featured={achievement.featured} />;

      default:
        return achievement[columnKey];
    }
  }, []);

  return (
    <ItemsTable
      items={items}
      count={count}
      title={'Achievement'}
      columns={achievementsColumns}
      renderCell={renderCell as unknown as <T, K>(item: T, columnKey: K) => JSX.Element}
    />
  );
};
