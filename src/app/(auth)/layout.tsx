export interface AuthPagesLayoutProps {
  children: React.ReactElement;
}

const AuthPagesLayout = ({ children }: Readonly<AuthPagesLayoutProps>) => {
  return <div className="md:24 container mx-auto px-8 py-12 lg:px-48">{children}</div>;
};

export default AuthPagesLayout;
