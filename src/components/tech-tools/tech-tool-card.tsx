import { TechToolWithStack } from '@/db/queries/tech-tools';
import { FeaturedFlag } from '@/components';

interface TechToolCardProps {
  techTool: TechToolWithStack;
}

export const TechToolCard = ({ techTool }: TechToolCardProps) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h4 className="text-lg font-medium">{techTool.title}</h4>
          <p className="text-xs text-foreground-400">{techTool?.stack?.title || 'N/A'}</p>
        </div>

        <FeaturedFlag featured={techTool.featured} />
      </div>
    </div>
  );
};
