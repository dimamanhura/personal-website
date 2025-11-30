'use client'

import { FunctionComponent } from "react";
import { Chip } from "@nextui-org/react";

interface FeatureFlagProps {
  featured: boolean;
};

const FeaturedFlag: FunctionComponent<FeatureFlagProps> = ({
  featured,
}) => {
  return (
    <Chip color={featured ? 'primary' : 'default'} variant="flat">
      {featured ? 'Featured' : 'Not featured'}
    </Chip>
  );
};

export default FeaturedFlag;
