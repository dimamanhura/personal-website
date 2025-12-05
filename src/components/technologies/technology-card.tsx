import { FeaturedFlag } from "@/components";
import { TechnologyWithSection } from "@/db/queries/technologies";

interface TechnologyCardProps {
  technology: TechnologyWithSection;
};

export const TechnologyCard = ({ technology }: TechnologyCardProps) => {
  return (
    <div className="w-full flex flex-col gap-2 py-4 px-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h4 className="text-lg font-medium">
            {technology.title}
          </h4>
          <p className="text-xs text-foreground-400">
            {technology.technologySection.title}
          </p>
        </div>
                  
        <FeaturedFlag featured={technology.featured} />
      </div>
    </div>
  );
};
