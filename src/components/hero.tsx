import { Avatar } from "@nextui-org/react";
import Contacts from "@/components/contacts";
import { Meta } from "@prisma/client";
import DownloadAsPdf from "./download-as-pdf";

interface HeroProps {
  meta: Meta;
}

const Hero = ({ meta }: HeroProps) => {
  return (
    <>
      <div className="w-full relative flex flex-col lg:flex-row justify-center items-center gap-4 py-6 px-6 bg-zinc-100 dark:bg-zinc-800">
        <Avatar
          src={meta.avatar}
          className="w-44 h-44 text-large border-white border-2 flex-shrink-0"
        />
        <div className="flex flex-col gap-1 lg:max-w-[600px]">
          <h1 className="w-full text-2xl text-center md:text-4xl md:text-left">
            {meta.firstName} {meta.lastName}
          </h1>
          <p className="w-full text-center text-xl md:text-left text-zinc-600 dark:text-zinc-400">
            {meta.title}
          </p>
          <p className="w-full text-sm text-zinc-500 dark:text-zinc-300 text-justify">
            {meta.description}
          </p>
        </div>
        <div className="absolute right-4 top-4">
          <DownloadAsPdf />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 py-4 px-6 bg-zinc-200 dark:bg-zinc-900">
        <Contacts
          contacts={meta.contacts}
          location={meta.location}
        />
      </div>
    </>
  );
};

export default Hero;