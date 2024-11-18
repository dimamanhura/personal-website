import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import paths from "@/paths";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-6 mb-6">
      <Link className="underline items-center text-blue-500 flex" href={paths.home()}>
        <FaArrowLeft className="mr-1" />
        Back
      </Link>
      <h1 className="text-2xl">
        {title}
      </h1>
    </div>
  );
};

export default Header;
