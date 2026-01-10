import { Chip, cn } from '@nextui-org/react';

interface ChipsListProps {
  vertical?: boolean;
  title?: string;
  chips: string[];
}

export const ChipsList = async ({ vertical, title, chips }: ChipsListProps) => {
  return (
    <div className={cn('flex flex-col gap-2', !vertical && 'md:flex-row')}>
      {title && <h4 className="min-w-32 font-medium">{title}:</h4>}
      <div className={cn('flex flex-wrap gap-2', !vertical && 'max-w-96')}>
        {chips.map((chip, index) => (
          <Chip key={index} size="sm" variant="flat">
            {chip}
          </Chip>
        ))}
      </div>
    </div>
  );
};
