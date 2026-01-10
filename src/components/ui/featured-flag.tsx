'use client';

import { FunctionComponent } from 'react';
import { Chip } from '@nextui-org/react';
import { FaFlag } from 'react-icons/fa';

interface FeatureFlagProps {
  featured: boolean;
}

export const FeaturedFlag: FunctionComponent<FeatureFlagProps> = ({ featured }) => {
  return (
    <Chip
      color={featured ? 'danger' : 'default'}
      isDisabled={!featured}
      variant="flat"
      size="lg"
      radius="sm"
    >
      <FaFlag />
    </Chip>
  );
};
