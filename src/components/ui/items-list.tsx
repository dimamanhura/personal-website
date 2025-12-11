import { FaCircle } from 'react-icons/fa';

interface ItemsListProps {
  title?: string;
  items: string[];
}

export const ItemsList = async ({ title, items }: ItemsListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {title && <h4 className="font-medium">{title}:</h4>}
      <ul>
        {items.map((text, index) => (
          <li className="flex items-center pl-4 text-sm text-foreground-400" key={index}>
            <FaCircle className="mr-2 flex-shrink-0 text-[4px] text-black dark:text-white" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
