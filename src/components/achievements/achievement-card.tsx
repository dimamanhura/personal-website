import { ItemsList, FeaturedFlag } from "@/components";

interface AchievementCardProps {
  withFeaturedFlag?: boolean;
  description: string;
  featured?: boolean;
  title: string;
  solution?: string[];
  result?: string[];
  notes?: string[];
};

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
    <div className="w-full flex flex-col gap-2 py-4 px-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
      <div className="flex justify-between">
        <h3 className="font-medium text-xl">
          {title}
        </h3>
        {withFeaturedFlag && (
          <FeaturedFlag featured={!!(featured)} />
        )}
      </div>
      
      <p className="text-sm">
        {description}
      </p>
      {solution && solution.length && (
        <ItemsList
          title="Solution"
          items={solution}
        />
      )}
      {result && result.length && (
        <ItemsList
          title="Result"
          items={result}
        />
      )}
      {notes && notes.length && (
        <ItemsList
          title="Notes"
          items={notes}
        />
      )}
    </div>
  );
};
