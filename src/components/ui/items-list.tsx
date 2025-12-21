import { FaCircle } from 'react-icons/fa';

interface BaseProps {
  title?: string;
}

interface StringItems extends BaseProps {
  items: string[];
  getLabel?: never;
}

interface ObjectItems<T extends object = object> extends BaseProps {
  items: T[];
  getLabel: (item: T) => string | JSX.Element;
}

type ItemsListProps = StringItems | ObjectItems;

export const ItemsList = async ({ title, items, getLabel }: ItemsListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {title && <h4 className="font-medium">{title}:</h4>}
      <ul>
        {items.map((item, index) => (
          <li className="flex items-center pl-4 text-sm text-foreground-400" key={index}>
            <FaCircle className="mr-2 flex-shrink-0 text-[4px] text-black dark:text-white" />
            <span>{getLabel ? getLabel(item as object) : (item as string)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
