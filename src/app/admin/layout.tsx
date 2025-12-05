import { adminPages } from '@/pages';
import { Nav } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: 'Admin - %s',
    default: 'Admin',
  },
};

export interface AdminPagesLayoutProps {
  children: React.ReactElement;
}

const AdminPagesLayout = ({ children }: Readonly<AdminPagesLayoutProps>) => {
  return (
    <>
      <Nav pages={adminPages} />
      <div className="container mx-auto py-12 px-8 md:24 lg:px-48">{children}</div>
    </>
  );
};

export default AdminPagesLayout;
