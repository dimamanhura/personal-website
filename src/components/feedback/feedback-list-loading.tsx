import { Skeleton } from '@nextui-org/react';

export const FeedbackListLoading = () => {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          className="flex w-full flex-col gap-2 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800"
          key={i}
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-medium">
                <Skeleton className="h-4 w-32 rounded-lg" />
              </h4>
              <p className="text-sm text-foreground-400">
                <Skeleton className="h-3 w-24 rounded-lg" />
              </p>
            </div>

            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          <div className="space-y-2 pt-4">
            <Skeleton className="h-3 w-full rounded-lg" />
            <Skeleton className="h-3 w-full rounded-lg" />
            <Skeleton className="h-3 w-2/3 rounded-lg" />
          </div>
        </div>
      ))}
    </>
  );
};
