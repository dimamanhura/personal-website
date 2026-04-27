'use client';

import { FunctionComponent } from 'react';
import { Chip, type ChipProps } from '@nextui-org/react';
import { ContactRequestClassification as ClassificationType } from '@prisma/client';

interface ContactRequestClassificationProps {
  classification: ClassificationType;
}

const classificationConfig: Record<
  ClassificationType,
  { color: ChipProps['color']; label: string }
> = {
  unclassified: { color: 'default', label: 'Unclassified' },
  spam: { color: 'warning', label: 'Spam' },
  solicitation: { color: 'secondary', label: 'Solicitation' },
  general: { color: 'primary', label: 'General' },
  critical: { color: 'danger', label: 'Critical' },
  no_reply_needed: { color: 'success', label: 'No Reply' },
};

export const ContactRequestClassification: FunctionComponent<ContactRequestClassificationProps> = ({
  classification,
}) => {
  const { color, label } =
    classificationConfig[classification] || classificationConfig.unclassified;

  return (
    <Chip color={color} variant="dot" className="gap-1 border-none capitalize">
      {label}
    </Chip>
  );
};
