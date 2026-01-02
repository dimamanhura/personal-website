import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

interface AddItemButtonProps {
  path: string;
}

export const AddItemButton = ({ path }: AddItemButtonProps) => {
  return (
    <Button startContent={<FaPlus />} color="primary" variant="flat" as={Link} href={path}>
      Add
    </Button>
  );
};
