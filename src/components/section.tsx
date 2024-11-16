import { Divider } from "@nextui-org/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface SectionProps {
  children: React.ReactNode;
  title: string;
  link?: string;
};

const Section = ({
  children,
  title,
  link,
}: SectionProps) => {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">
          {title}
        </h2>

        {link && (
          <Link href={link} className="underline flex items-center text-blue-500">
            More Details 
            <FaArrowRight className="ml-1" />
          </Link>
        )}
      </div>
      
      <Divider className="my-4" />

      <div className="flex flex-col gap-4 items-start">
        {children}
      </div>
    </section>
  );
};

export default Section;