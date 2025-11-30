interface HeaderProps {
  title: string;
  renderActions?: () => JSX.Element;
};

const Header = ({ title, renderActions }: HeaderProps) => {
  return (
    <div className="flex justify-between align-top gap-6 mb-6">
      <h1 className="text-2xl">
        {title}
      </h1>

      {renderActions && renderActions()}
    </div>
  );
};

export default Header;
