'use client'

import { FunctionComponent } from "react";
import { Chip } from "@nextui-org/react";

interface ContactRequestStatusProps {
  resolved: boolean;
};

export const ContactRequestStatus: FunctionComponent<ContactRequestStatusProps> = ({
  resolved,
}) => {
  return (
    <Chip color={resolved ? 'success' : 'warning'} variant="flat">
      {resolved ? 'Resolved' : 'Pending'}
    </Chip>
  );
};
