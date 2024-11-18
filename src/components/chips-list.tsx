import { Chip } from "@nextui-org/react";

interface ChipsListProps {
  title?: string;
  chips: string[];
};

const ChipsList = async ({ title, chips }: ChipsListProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      {title && (
        <h4 className="font-medium min-w-32">
          {title}:
        </h4>
      )}
      <div className="flex flex-wrap gap-2 max-w-96">
        {chips.map((chip, index) => (
          <Chip key={index} size="sm" variant="flat">
            {chip}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default ChipsList;
