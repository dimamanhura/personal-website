import { Metadata } from 'next';
import { Nav } from '@/components';
import { adminPages } from '@/pages';

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
      <div className="md:24 container mx-auto px-8 py-12 lg:px-48">{children}</div>
    </>
  );
};

export default AdminPagesLayout;
