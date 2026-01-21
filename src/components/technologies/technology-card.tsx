import { TechnologyWithStack } from '@/db/queries/technologies';
import { FeaturedFlag } from '@/components';

interface TechnologyCardProps {
  technology: TechnologyWithStack;
}

export const TechnologyCard = ({ technology }: TechnologyCardProps) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h4 className="text-lg font-medium">{technology.title}</h4>
          <p className="text-xs text-foreground-400">{technology?.stack?.title || 'N/A'}</p>
        </div>

        <FeaturedFlag featured={technology.featured} />
      </div>
    </div>
  );
};
