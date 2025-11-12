'use client'

import ItemsTable from "@/components/items-table";
import { Column } from "@/types/Column";
import { formatId } from "@/utils/format-id";
import type { ContactRequest } from "@prisma/client";
import { FunctionComponent, useCallback, useMemo } from "react";

interface ContactRequestsTableProps {
  items: ContactRequest[];
  count: number;
};

const ContactRequestsTable: FunctionComponent<ContactRequestsTableProps> = ({
  items,
  count,
}) => {
  const title = 'Contact Requests';

  const columns: Column[] = useMemo(() => ([
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'message', label: 'Message' },
    { key: 'createdAt', label: 'Requested At' },
  ]), []);

  const renderCell = useCallback((contactRequest: any, columnKey: any) => {
    const cellValue = contactRequest[columnKey];

    switch (columnKey) {
      case "id":
        return (
          <>{formatId(cellValue)}</>
        );
      case "createdAt":
        return (
          <>{cellValue.toLocaleDateString()}</>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <ItemsTable
      items={items}
      count={count}
      title={title}
      columns={columns}
      renderCell={renderCell}
    />
  );
};

export default ContactRequestsTable;
