import { Avatar } from '@nextui-org/react';
import { Meta } from '@prisma/client';
import { Contacts, DownloadAsPdf } from '@/components';

interface HeroProps {
  meta: Meta;
}

export const Hero = ({ meta }: HeroProps) => {
  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center gap-4 bg-zinc-100 px-6 py-6 dark:bg-zinc-800 lg:flex-row">
        <Avatar
          src={meta.avatar}
          className="h-44 w-44 flex-shrink-0 border-2 border-white text-large"
        />
        <div className="flex flex-col gap-1 lg:max-w-[600px]">
          <h1 className="w-full text-center text-2xl md:text-left md:text-4xl">
            {meta.firstName} {meta.lastName}
          </h1>
          <p className="w-full text-center text-xl text-zinc-600 dark:text-zinc-400 md:text-left">
            {meta.title}
          </p>
          <p className="w-full text-justify text-sm text-zinc-500 dark:text-zinc-300">
            {meta.description}
          </p>
        </div>
        <div className="absolute right-4 top-4">
          <DownloadAsPdf />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4 bg-zinc-200 px-6 py-4 dark:bg-zinc-900 md:flex-row">
        <Contacts contacts={meta.contacts} location={meta.location} />
      </div>
    </>
  );
};
