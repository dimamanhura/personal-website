import { Achievement } from "@prisma/client";
import AchievementCard from "./achievement-card";

interface FeaturedAchievementsListProps {
  featuredAchievements: Achievement[];
};

const FeaturedAchievementsList = ({ featuredAchievements }: FeaturedAchievementsListProps) => {
  return featuredAchievements.map(featuredAchievement => {
    const { title, description, id } = featuredAchievement;
    return (
      <AchievementCard
        description={description}
        title={title}
        key={id}
      />
    );
  });
};

export default FeaturedAchievementsList;
