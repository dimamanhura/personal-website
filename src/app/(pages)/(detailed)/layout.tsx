export interface PagesLayout {
  children: React.ReactElement;
}

const PagesLayout = ({ children }: Readonly<PagesLayout>) => {
  return <div className="md:24 container mx-auto px-8 py-12 lg:px-48">{children}</div>;
};

export default PagesLayout;
