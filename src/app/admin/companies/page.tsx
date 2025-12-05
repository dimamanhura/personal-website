import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Companies',
};

const CompaniesAdminPage = async () => {
  return (
    <>
      <Header title="Companies" />
    </>
  );
};

export default CompaniesAdminPage;
