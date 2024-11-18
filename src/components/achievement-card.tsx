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
  return (
    <div className="w-full flex flex-col gap-2 py-4 px-6 bg-zinc-100 rounded-lg">
      <h3 className="font-medium text-xl">
        {title}
      </h3>
      <p className="text-sm">
        {description}
      </p>
      {solution && solution.length && (
        <>
          <h4 className="font-medium">Solution:</h4>
          <ul>
            {solution.map((text, index) => (
              <li className="pl-4 flex items-center text-sm text-foreground-400" key={index}>
                <FaCircle className="text-black mr-2 text-[4px]" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {result && result.length && (
        <>
          <h4 className="font-medium">Result:</h4>
          <ul>
            {result.map((text, index) => (
              <li className="pl-4 flex items-center text-sm text-foreground-400" key={index}>
                <FaCircle className="text-black mr-2 text-[4px]" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {notes && notes.length && (
        <>
          <h4 className="font-medium">Notes:</h4>
          <ul>
            {notes.map((text, index) => (
              <li className="pl-4 flex items-center text-sm text-foreground-400" key={index}>
                <FaCircle className="text-black mr-2 text-[4px]" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AchievementCard;
