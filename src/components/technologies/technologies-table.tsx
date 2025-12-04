'use client'

import { FunctionComponent, useCallback } from "react";
import { ItemsTable, TableActions, TruncatedText, FeaturedFlag } from "@/components";
import { Column } from "@/types";
import paths from "@/paths";
import { deleteTechnology } from "@/actions";
import { TechnologyWithSection } from "@/db/queries/technologies";
import { User } from "@nextui-org/react";

interface TechnologiesTableProps {
  items: TechnologyWithSection[];
  count: number;
};

type TechnologyKey = Extract<keyof TechnologyWithSection, string>;

type ColumnKey = TechnologyKey | 'actions';

const columns: Column<ColumnKey>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'title', label: 'Title', allowsSorting: true },
  { key: 'technologySection', label: 'Section', allowsSorting: true },
  { key: 'featured', label: 'Featured', allowsSorting: true },
  { key: 'actions', label: 'Actions', allowsSorting: false },
];

export const TechnologiesTable: FunctionComponent<TechnologiesTableProps> = ({
  items,
  count,
}) => {
  const renderCell = useCallback((technology: TechnologyWithSection, columnKey: ColumnKey) => {
    if (columnKey === 'actions') {
      return (
        <TableActions
          showPath={paths.technologyDetails}
          editPath={paths.editTechnology}
          itemId={technology.id}
          onDelete={deleteTechnology}
        />
      );
    }

    switch (columnKey) {
      case 'id':
        return <TruncatedText text={technology.id} />;      
      
      case 'featured':
        return <FeaturedFlag featured={technology.featured} />;

      case 'technologySection':
        return (
          <User
            avatarProps={{ src: technology.technologySection.logo, size: 'sm', radius: 'md' }}
            name={technology.technologySection.title}
          />
        );

      default:
        return technology[columnKey];
    }
  }, []);

  return (
    <ItemsTable
      items={items}
      count={count}
      title={'Technologies'}
      columns={columns}
      renderCell={renderCell as unknown as <T, K>(item: T, columnKey: K) => JSX.Element}
    />
  );
};
