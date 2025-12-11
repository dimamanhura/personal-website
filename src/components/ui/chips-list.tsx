import { Chip } from '@nextui-org/react';

interface ChipsListProps {
  title?: string;
  chips: string[];
}

export const ChipsList = async ({ title, chips }: ChipsListProps) => {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      {title && <h4 className="min-w-32 font-medium">{title}:</h4>}
      <div className="flex max-w-96 flex-wrap gap-2">
        {chips.map((chip, index) => (
          <Chip key={index} size="sm" variant="flat">
            {chip}
          </Chip>
        ))}
      </div>
    </div>
  );
};
