import { fetchTechnologiesSections } from "@/db/queries/technologies";
import { fetchFeaturedReviews } from "@/db/queries/feedback";
import { fetchUniversities } from "@/db/queries/education";
import { fetchCompanies } from "@/db/queries/companies";
import { fetchMeta } from "@/db/queries/meta";
import TechnologiesSectionsList from "@/components/technologies-sections-list";
import FeaturedReviewsList from "@/components/reviews-list";
import UniversitiesList from "@/components/universities-list";
import CompaniesList from "@/components/companies-list";
import Contacts from "@/components/contacts";
import Section from "@/components/section";
import Banner from "@/components/banner";
import Hero from "@/components/hero";
import paths from "@/paths";

const HomePage = async () => {
  const [
    technologiesSections,
    featuredReviews,
    universities,
    companies,
    meta,
  ] = await Promise.all([
    fetchTechnologiesSections(),
    fetchFeaturedReviews(),
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
          <Banner>
            <Contacts
              contacts={meta.contacts}
              location={meta.location}
            />
          </Banner>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 flex flex-col gap-12">
          <Section title="Technologies" link={paths.technologies()}>
            <TechnologiesSectionsList technologiesSections={technologiesSections} />
          </Section>
          <Section title="Employment History">
            <CompaniesList companies={companies} />
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
            <FeaturedReviewsList featuredReviews={featuredReviews} />
          </Section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
