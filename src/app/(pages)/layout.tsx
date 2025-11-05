import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { pages } from "@/pages";

export interface PagesLayout {
  children: React.ReactElement;
};

const PagesLayout = ({ children }: Readonly<PagesLayout>) => {
  return (
    <>
      <Nav pages={pages} />
      {children}
      <Footer />
    </>
  );
};

export default PagesLayout;
