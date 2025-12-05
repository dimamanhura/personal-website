import { ItemsList, FeaturedFlag } from '@/components';

interface AchievementCardProps {
  withFeaturedFlag?: boolean;
  description: string;
  featured?: boolean;
  title: string;
  solution?: string[];
  result?: string[];
  notes?: string[];
}

export const AchievementCard = ({
  withFeaturedFlag,
  description,
  featured,
  title,
  solution,
  result,
  notes,
}: AchievementCardProps) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">{title}</h3>
        {withFeaturedFlag && <FeaturedFlag featured={!!featured} />}
      </div>

      <p className="text-sm">{description}</p>
      {solution && solution.length && <ItemsList title="Solution" items={solution} />}
      {result && result.length && <ItemsList title="Result" items={result} />}
      {notes && notes.length && <ItemsList title="Notes" items={notes} />}
    </div>
  );
};
