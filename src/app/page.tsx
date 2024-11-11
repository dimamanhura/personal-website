import CompanyCard from "@/components/company-card";
import Section from "@/components/section";
import { fetchCompanies } from "@/db/queries/companies";

const HomePage = async () => {
  const [
    companies,
  ] = await Promise.all([
    fetchCompanies(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 py-20 gap-8">
      <div className="col-span-1">
        <Section title="Employment History">
          {companies.map(company => (
            <CompanyCard company={company} key={company.id} />
          ))}
        </Section>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}

export default HomePage;
