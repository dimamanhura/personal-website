import { Header } from '@/components';
import { Metadata } from 'next';

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
