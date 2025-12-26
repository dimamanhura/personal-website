import { Metadata } from 'next';
import { OverviewHeader, CreateCompanyForm } from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'Company - New',
};

const EducationAddPage = () => {
  return (
    <>
      <OverviewHeader backPath={paths.companiesAdmin()} />
      <CreateCompanyForm />
    </>
  );
};

export default EducationAddPage;
