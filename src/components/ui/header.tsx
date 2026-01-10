interface HeaderProps {
  title: string;
  renderActions?: () => JSX.Element | JSX.Element[];
}

export const Header = ({ title, renderActions }: HeaderProps) => {
  return (
    <div className="mb-6 flex justify-between gap-6 align-top">
      <h1 className="text-2xl">{title}</h1>

      {renderActions && (
        <div className="flex items-center justify-center gap-2">{renderActions()}</div>
      )}
    </div>
  );
};
