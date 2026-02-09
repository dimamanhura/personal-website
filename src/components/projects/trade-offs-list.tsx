import { ProjectTradeOff } from '@prisma/client';

interface TradeOffsListProps {
  items: ProjectTradeOff[];
}

export const TradeOffsList = ({ items }: TradeOffsListProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-medium">Trade-offs:</h4>
      <div className="grid gap-6">
        {items.map((item, index) => (
          <div key={index} className="group relative flex flex-col gap-1 pl-6">
            <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-primary" />

            <div className="flex items-baseline gap-2">
              <span className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                {item.chosen}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                OVER
              </span>
              <span className="text-sm font-normal text-zinc-500">{item.alternative}</span>
            </div>

            {item.reason && (
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {item.reason}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
