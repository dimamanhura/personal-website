'use client'

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaPen } from "react-icons/fa";

interface EditTableItemButtonProps {
  path: string;
};

const EditTableItemButton: FunctionComponent<EditTableItemButtonProps> = ({
  path,
}) => {
  return (
    <Button isIconOnly color="warning" variant="flat" as={Link} href={path}>
      <FaPen />
    </Button>
  );
};

export default EditTableItemButton;
