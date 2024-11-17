import { fetchTechnologiesSections } from "@/db/queries/technologies";
import { fetchFeaturedAchievements } from "@/db/queries/achievements";
import { fetchSignificantProjects } from "@/db/queries/projects";
import { fetchFeaturedReviews } from "@/db/queries/feedback";
import { fetchUniversities } from "@/db/queries/education";
import { fetchCompanies } from "@/db/queries/companies";
import { fetchMeta } from "@/db/queries/meta";
import TechnologiesSectionsList from "@/components/technologies-sections-list";
import FeaturedAchievementsList from "@/components/featured-achievements-list";
import SignificantProjectsList from "@/components/significant-projects-list";
import FeaturedReviewsList from "@/components/reviews-list";
import UniversitiesList from "@/components/universities-list";
import CompaniesList from "@/components/companies-list";
import Section from "@/components/section";
import Hero from "@/components/hero";
import paths from "@/paths";

const HomePage = async () => {
  const [
    technologiesSections,
    featuredAchievements,
    significantProjects,
    featuredReviews,
    universities,
    companies,
    meta,
  ] = await Promise.all([
    fetchTechnologiesSections(),
    fetchFeaturedAchievements(),
    fetchSignificantProjects(),
    fetchFeaturedReviews(),
    fetchUniversities(),
    fetchCompanies(),
    fetchMeta(),
  ]);

  return (
    <>
      {meta && <Hero meta={meta} />}
      <div className="container mx-auto py-12">
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
            <Section title="Feedback" link={paths.feedback()}>
              <FeaturedReviewsList featuredReviews={featuredReviews} />
            </Section>
          </div>
          <div className="col-span-2 flex flex-col gap-12">
            <Section title="Significant Projects" link={paths.projects()}>
              <SignificantProjectsList significantProjects={significantProjects} />
            </Section>
            <Section title="Challenges & Achievements" link={paths.achievements()}>
              <FeaturedAchievementsList featuredAchievements={featuredAchievements} />
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
