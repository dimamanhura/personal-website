import { Metadata } from 'next';
import { fetchTechnologiesSections } from '@/db/queries/technologies';
import { fetchFeaturedAchievements } from '@/db/queries/achievements';
import { fetchFeaturedSignificantProjects } from '@/db/queries/projects';
import { fetchFeaturedReviews } from '@/db/queries/feedback';
import { fetchUniversities } from '@/db/queries/education';
import { fetchCompanies } from '@/db/queries/companies';
import { fetchMeta } from '@/db/queries/meta';
import {
  TechnologiesSectionsList,
  FeaturedAchievementsList,
  SignificantProjectsList,
  UniversitiesList,
  CompaniesList,
  ReviewList,
  Section,
  Hero,
} from '@/components';
import paths from '@/paths';

export const metadata: Metadata = {
  title: 'My Personal Website',
  description: 'My personal website with an overview of my career',
  keywords: ['Personal', 'Private', 'Website'],
};

export const revalidate = 60 * 60;

const HomePage = async () => {
  const [
    featuredSignificantProjects,
    technologiesSections,
    featuredAchievements,
    featuredReviews,
    universities,
    companies,
    meta,
  ] = await Promise.all([
    fetchFeaturedSignificantProjects(),
    fetchTechnologiesSections(),
    fetchFeaturedAchievements(),
    fetchFeaturedReviews(),
    fetchUniversities(),
    fetchCompanies(),
    fetchMeta(),
  ]);

  return (
    <>
      {meta && <Hero meta={meta} />}
      <div className="container mx-auto py-12 px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-12">
            <Section title="Significant Projects" link={paths.projects()}>
              <SignificantProjectsList significantProjects={featuredSignificantProjects} />
            </Section>
            <Section title="Challenges & Achievements" link={paths.achievements()}>
              <FeaturedAchievementsList featuredAchievements={featuredAchievements} />
            </Section>
          </div>
          <div className="col-span-1 lg:col-span-1 flex flex-col gap-12">
            <Section title="Technologies">
              <TechnologiesSectionsList technologiesSections={technologiesSections} />
            </Section>
            <Section title="Employment History">
              <CompaniesList companies={companies} />
            </Section>
            <Section title="Education">
              <UniversitiesList universities={universities} />
            </Section>
            <Section title="Feedback" link={paths.feedback()}>
              <ReviewList featuredReviews={featuredReviews} />
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
