'use client'

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaEye } from "react-icons/fa";

interface ShowItemButtonProps {
  isIconOnly?: boolean; 
  path: string;
};

const ShowItemButton: FunctionComponent<ShowItemButtonProps> = ({
  isIconOnly = true,
  path,
}) => {
  return (
    <Button isIconOnly={isIconOnly} color="success" variant="flat" as={Link} href={path}>
      {isIconOnly ? <FaEye /> : 'View'}
    </Button>
  );
};

export default ShowItemButton;
