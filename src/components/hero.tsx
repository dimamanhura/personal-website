import { Avatar } from "@nextui-org/react";
import Banner from "@/components/banner";

interface HeroProps {
  description: string;
  firstName: string;
  lastName: string;
  avatar: string;
  title: string;
}

const Hero = ({
  description,
  firstName,
  lastName,
  avatar,
  title,
}: HeroProps) => {
  return (
    <Banner>
      <Avatar src={avatar} className="w-40 h-40 text-large border-white border-2" />
      <div className="flex flex-col gap-1">
        <h1 className="w-full text-4xl">{firstName} {lastName}</h1>
        <p className="w-full text-xl">{title}</p>
        <p className="w-full">{description}</p>
      </div>
    </Banner>
  );
};

export default Hero;