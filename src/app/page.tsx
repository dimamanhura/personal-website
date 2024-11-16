import { fetchTechnologiesSections } from "@/db/queries/technologies";
import { fetchUniversities } from "@/db/queries/education";
import { fetchCompanies } from "@/db/queries/companies";
import { fetchMeta } from "@/db/queries/meta";
import UniversitiesList from "@/components/universities-list";
import CompaniesList from "@/components/companies-list";
import Contacts from "@/components/contacts";
import Section from "@/components/section";
import Hero from "@/components/hero";
import paths from "@/paths";
import TechnologiesSectionsList from "@/components/technologies-sections-list";

const HomePage = async () => {
  const [
    technologiesSections,
    universities,
    companies,
    meta,
  ] = await Promise.all([
    fetchTechnologiesSections(),
    fetchUniversities(),
    fetchCompanies(),
    fetchMeta(),
  ]);

  return (
    <div className="py-12">
      {meta && (
        <div className="w-full mb-12 flex flex-col gap-4">
          <Hero
            description={meta.description}
            firstName={meta.firstName}
            lastName={meta.lastName}
            avatar={meta.avatar}
            title={meta.title}
          />
          <Contacts
            contacts={meta.contacts}
            location={meta.location}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 flex flex-col gap-12">
          <Section title="Employment History">
            <CompaniesList companies={companies} />
          </Section>
          <Section title="Technologies" link={paths.technologies()}>
            <TechnologiesSectionsList technologiesSections={technologiesSections} />
          </Section>
          <Section title="Education">
            <UniversitiesList universities={universities} />
          </Section>
        </div>
        <div className="col-span-2 flex flex-col gap-12">
          <Section title="Significant Projects" link={paths.projects()}>
            Significant Projects
          </Section>
          <Section title="Achievements" link={paths.achievements()}>
            Achievements
          </Section>
          <Section title="Feedback" link={paths.feedback()}>
            Feedback
          </Section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
