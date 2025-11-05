

export interface AuthPagesLayoutProps {
  children: React.ReactElement;
};

const AuthPagesLayout = ({ children }: Readonly<AuthPagesLayoutProps>) => {
  return (
    <div className="container mx-auto py-12 px-8 md:24 lg:px-48">
      {children}
    </div>
  );
};

export default AuthPagesLayout;
