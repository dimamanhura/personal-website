import { Button, Divider } from '@nextui-org/react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface SectionProps {
  children: React.ReactNode;
  title: string;
  link?: string;
}

export const Section = ({ children, title, link }: SectionProps) => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl">{title}</h2>

        {link && (
          <>
            <Link
              className="hidden items-center text-blue-500 underline md:flex print:hidden"
              href={link}
            >
              See All
              <FaArrowRight className="ml-1" />
            </Link>
            <Button
              isIconOnly
              className="md:hidden print:hidden"
              variant="light"
              radius="full"
              color="primary"
              href={link}
              as={Link}
            >
              <FaArrowRight className="ml-1" />
            </Button>
          </>
        )}
      </div>

      <Divider className="my-4" />

      <div className="flex flex-col items-start gap-4">{children}</div>
    </section>
  );
};
