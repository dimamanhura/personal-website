'use client';

import { FunctionComponent } from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa';

interface EditItemButtonProps {
  isIconOnly?: boolean;
  path: string;
}

export const EditItemButton: FunctionComponent<EditItemButtonProps> = ({
  isIconOnly = true,
  path,
}) => {
  return (
    <Button isIconOnly={isIconOnly} color="warning" variant="flat" as={Link} href={path}>
      {isIconOnly ? <FaPen /> : 'Edit'}
    </Button>
  );
};
