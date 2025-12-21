import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CompanyCard, OverviewHeader } from '@/components';
import paths from '@/paths';
import { deleteCompany } from '@/actions';
import { fetchCompanyById } from '@/db/queries/companies';

interface CompanyShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: CompanyShowPageProps): Metadata {
  return {
    title: `Company - Details - ${id}`,
  };
}

const CompanyShowPage = async ({ params }: CompanyShowPageProps) => {
  const company = await fetchCompanyById(params.id);

  if (!company) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.companiesAdmin()}
        editPath={paths.companiesEditByIdAdmin(params.id)}
        itemId={params.id}
        onDelete={deleteCompany}
      />
      <CompanyCard company={company} />
    </>
  );
};

export default CompanyShowPage;
