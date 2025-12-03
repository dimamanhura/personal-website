'use client'

import { FunctionComponent } from "react";
import { Badge, Chip } from "@nextui-org/react";

interface ItemsCountProps {
  label: string;
  count: number;
};

const ItemsCount: FunctionComponent<ItemsCountProps> = ({
  label,
  count,
}) => {
  return (
    <Badge color="primary" content={count} variant="solid" size="sm">
      <Chip variant="flat">{label}</Chip>
    </Badge>
  );
};

export default ItemsCount;
