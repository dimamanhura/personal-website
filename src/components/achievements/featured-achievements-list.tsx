import { Achievement } from '@prisma/client';
import { AchievementCard } from '@/components';

interface FeaturedAchievementsListProps {
  featuredAchievements: Achievement[];
}

export const FeaturedAchievementsList = ({
  featuredAchievements,
}: FeaturedAchievementsListProps) => {
  return featuredAchievements.map((featuredAchievement) => {
    const { title, description, id } = featuredAchievement;
    return <AchievementCard description={description} title={title} key={id} />;
  });
};
