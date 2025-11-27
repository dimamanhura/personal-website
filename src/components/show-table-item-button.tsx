'use client'

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaEye } from "react-icons/fa";

interface ShowTableItemButtonProps {
  path: string;
};

const ShowTableItemButton: FunctionComponent<ShowTableItemButtonProps> = ({
  path,
}) => {
  return (
    <Button isIconOnly color="success" variant="flat" as={Link} href={path}>
      <FaEye />
    </Button>
  );
};

export default ShowTableItemButton;
