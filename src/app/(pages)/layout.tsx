export interface PagesLayout {
  children: React.ReactElement;
};

const PagesLayout = ({ children }: Readonly<PagesLayout>) => {
  return (
    <div className="container mx-auto py-12 px-24 md:px-16">
      {children}
    </div>
  );
};

export default PagesLayout;
