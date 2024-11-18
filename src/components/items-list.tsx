import { FaCircle } from "react-icons/fa";

interface ItemsListProps {
  title?: string;
  items: string[]
};

const ItemsList = async ({ title, items }: ItemsListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <h4 className="font-medium">{title}:</h4>
      )}
      <ul>
        {items.map((text, index) => (
          <li className="pl-4 flex items-center text-sm text-foreground-400" key={index}>
            <FaCircle className="text-black mr-2 text-[4px] flex-shrink-0" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
