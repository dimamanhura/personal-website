import { FaCircle } from "react-icons/fa";

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
  const renderItems = (title: string, items: string[]): React.ReactElement => {
    return (
      <>
        <h4 className="font-medium">{title}:</h4>
        <ul>
          {items.map((text, index) => (
            <li className="pl-4 flex items-center text-sm text-foreground-400" key={index}>
              <FaCircle className="text-black mr-2 text-[4px] flex-shrink-0" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="w-full flex flex-col gap-2 py-4 px-6 bg-zinc-100 rounded-lg">
      <h3 className="font-medium text-xl">
        {title}
      </h3>
      <p className="text-sm">
        {description}
      </p>
      {solution && solution.length && renderItems('Solution', solution)}
      {result && result.length && renderItems('Result', result)}
      {notes && notes.length && renderItems('Notes', notes)}
    </div>
  );
};

export default AchievementCard;
