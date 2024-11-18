import ItemsList from "@/components/items-list";

interface AchievementCardProps {
  description: string;
  title: string;
  solution?: string[];
  result?: string[];
  notes?: string[];
};

const AchievementCard = ({
  description,
  title,
  solution,
  result,
  notes,
}: AchievementCardProps) => {
  return (
    <div className="w-full flex flex-col gap-2 py-4 px-6 bg-zinc-100 rounded-lg">
      <h3 className="font-medium text-xl">
        {title}
      </h3>
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

export default AchievementCard;
