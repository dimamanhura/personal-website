import { TechCategoryWithStacks } from '@/db/queries/tech-categories';
import { ChipsList } from '@/components';

interface TechCategoryCardProps {
  techCategory: TechCategoryWithStacks;
}

export const TechCategoryCard = ({ techCategory }: TechCategoryCardProps) => {
  const stacks = techCategory.stacks.map((stack) => stack.title);
  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <h4 className="text-lg font-medium">{techCategory.title}</h4>
      <p className="text-xs text-foreground-400">{techCategory?.type}</p>
      {stacks.length > 0 && <ChipsList vertical title="Stacks" chips={stacks} />}
    </div>
  );
};
