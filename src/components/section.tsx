import { Divider } from "@nextui-org/react";

interface SectionProps {
  children: React.ReactNode;
  title: string;
};

const Section = ({
  children,
  title,
}: SectionProps) => {
  return (
    <section>
      <h2 className="text-2xl">
        {title}
      </h2>
      <Divider className="my-4" />
      <div className="flex flex-col gap-4 items-start">
        {children}
      </div>
    </section>
  );
};

export default Section;