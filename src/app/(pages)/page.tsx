import { Metadata } from 'next';
import { fetchFeaturedAchievements } from '@/db/queries/achievements';
import { fetchCompanies } from '@/db/queries/companies';
import { fetchUniversities } from '@/db/queries/education';
import { fetchFeaturedReviews } from '@/db/queries/feedback';
import { fetchMeta } from '@/db/queries/meta';
import { fetchFeaturedSignificantProjects } from '@/db/queries/projects';
import { fetchTechStacks } from '@/db/queries/tech-stacks';
import {
  FeaturedAchievementsList,
  SignificantProjectsList,
  UniversitiesList,
  TechStacksList,
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
    techStacks,
    featuredAchievements,
    featuredReviews,
    universities,
    companies,
    meta,
  ] = await Promise.all([
    fetchFeaturedSignificantProjects(),
    fetchTechStacks({
      onlyFeatured: true,
      all: true,
      orderBy: { column: 'displayOrder', direction: 'ascending' },
    }),
    fetchFeaturedAchievements(),
    fetchFeaturedReviews(),
    fetchUniversities({ all: true }),
    fetchCompanies(),
    fetchMeta(),
  ]);

  return (
    <>
      {meta && <Hero meta={meta} />}
      <div className="container mx-auto px-8 py-12 md:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="col-span-1 flex flex-col gap-12 lg:col-span-2">
            <Section title="Significant Projects" link={paths.projects()}>
              <SignificantProjectsList significantProjects={featuredSignificantProjects} />
            </Section>
            <Section title="Challenges & Achievements" link={paths.achievements()}>
              <FeaturedAchievementsList featuredAchievements={featuredAchievements} />
            </Section>
          </div>
          <div className="col-span-1 flex flex-col gap-12 lg:col-span-1">
            <Section title="Technologies">
              <TechStacksList techStacks={techStacks.items} />
            </Section>
            <Section title="Employment History">
              <CompaniesList companies={companies.items} />
            </Section>
            <Section title="Education">
              <UniversitiesList universities={universities.items} />
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
