import UniversityCard from "@/components/university-card";
import CompanyCard from "@/components/company-card";
import Section from "@/components/section";
import { fetchUniversities } from "@/db/queries/education";
import { fetchCompanies } from "@/db/queries/companies";

const HomePage = async () => {
  const [
    universities,
    companies,
  ] = await Promise.all([
    fetchUniversities(),
    fetchCompanies(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 py-20 gap-8">
      <div className="col-span-1 flex flex-col gap-8">
        <Section title="Employment History">
          {companies.map(company => (
            <CompanyCard company={company} key={company.id} />
          ))}
        </Section>
        <Section title="Education">
          {universities.map(university => (
            <UniversityCard university={university} key={university.id} />
          ))}
        </Section>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}

export default HomePage;
