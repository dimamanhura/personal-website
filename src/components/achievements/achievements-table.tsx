'use client'

import { FunctionComponent, useCallback } from "react";
import { ItemsTable, TableActions, TruncatedText, FeaturedFlag, ItemsCount } from "@/components";
import { Column } from "@/types";
import paths from "@/paths";
import { Achievement } from "@prisma/client";
import { deleteAchievement } from "@/actions";

interface AchievementsTableProps {
  items: Achievement[];
  count: number;
};

type AchievementKey = Extract<keyof Achievement, string>;

type ColumnKey = AchievementKey | 'actions';

const columns: Column<ColumnKey>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'title', label: 'Title', allowsSorting: true },
  { key: 'description', label: 'Description', allowsSorting: true },
  { key: 'solution', label: 'Solution', allowsSorting: true },
  { key: 'result', label: 'Review', allowsSorting: true },
  { key: 'notes', label: 'Notes', allowsSorting: true },
  { key: 'featured', label: 'Featured', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];

export const AchievementsTable: FunctionComponent<AchievementsTableProps> = ({
  items,
  count,
}) => {
  const renderCell = useCallback((achievement: Achievement, columnKey: ColumnKey) => {
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
        return <ItemsCount count={achievement.notes.length} label="Notes" />;;

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
      columns={columns}
      renderCell={renderCell as unknown as <T, K>(item: T, columnKey: K) => JSX.Element}
    />
  );
};
