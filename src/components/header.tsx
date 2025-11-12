interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-6 mb-6">
      <h1 className="text-2xl">
        {title}
      </h1>
    </div>
  );
};

export default Header;
