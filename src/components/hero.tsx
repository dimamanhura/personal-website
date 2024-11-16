import { Avatar } from "@nextui-org/react";
import Contacts from "@/components/contacts";
import { Meta } from "@prisma/client";

interface HeroProps {
  meta: Meta;
}

const Hero = ({ meta }: HeroProps) => {
  return (
    <>
      <div className="w-full flex justify-center gap-4 py-6 px-6 bg-zinc-100">
        <Avatar src={meta.avatar} className="w-40 h-40 text-large border-white border-2" />
        <div className="flex flex-col gap-1">
          <h1 className="w-full text-4xl">{meta.firstName} {meta.lastName}</h1>
          <p className="w-full text-xl">{meta.title}</p>
          <p className="w-full">{meta.description}</p>
        </div>
      </div>
      <div className="w-full flex justify-center gap-4 py-4 px-6 bg-zinc-200 rounded-md">
        <Contacts
          contacts={meta.contacts}
          location={meta.location}
        />
      </div>
    </>
  );
};

export default Hero;