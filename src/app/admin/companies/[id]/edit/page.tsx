import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCompanyById } from '@/db/queries/companies';
import { deleteCompany } from '@/actions';
import { EditCompanyForm, OverviewHeader } from '@/components';
import paths from '@/paths';

interface CompanyEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: CompanyEditPageProps): Metadata {
  return {
    title: `Company - Edit - ${id}`,
  };
}

const CompanyEditPage = async ({ params }: CompanyEditPageProps) => {
  const company = await fetchCompanyById(params.id);

  if (!company) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.companiesAdmin()}
        itemId={params.id}
        onDelete={deleteCompany}
      />
      <EditCompanyForm company={company} />
    </>
  );
};

export default CompanyEditPage;
