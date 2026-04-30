import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface BackToAllLinkProps {
  path: string;
}

export const BackToAllLink = ({ path }: BackToAllLinkProps) => {
  return (
    <Link className="mb-6 flex items-center text-blue-500 underline" href={path}>
      <FaArrowLeft className="mr-1" />
      Back to all
    </Link>
  );
};
