import { Achievement } from "@prisma/client";

interface FeaturedAchievementsListProps {
  featuredAchievements: Achievement[];
};

const FeaturedAchievementsList = ({ featuredAchievements }: FeaturedAchievementsListProps) => {
  return featuredAchievements.map(featuredAchievement => {
    const { title, description, id } = featuredAchievement;
    return (
      <div className="w-full py-4 px-6 bg-zinc-100 rounded-lg" key={id}>
        <h3 className="font-medium">
          {title}
        </h3>
        <p className="mt-2 text-sm">
          {description}
        </p>
      </div>
    );
  });
};

export default FeaturedAchievementsList;
