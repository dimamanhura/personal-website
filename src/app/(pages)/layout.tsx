export interface PagesLayout {
  children: React.ReactElement;
};

const PagesLayout = ({ children }: Readonly<PagesLayout>) => {
  return (
    <div className="container mx-auto py-12 px-8 md:24 lg:px-48">
      {children}
    </div>
  );
};

export default PagesLayout;
