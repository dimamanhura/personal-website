import AchievementCard from "@/components/achievement-card";
import Header from "@/components/header";
import { fetchAchievements } from "@/db/queries/achievements";

const AchievementsPage = async () => {
  const achievements = await fetchAchievements();
  return (
    <>
      <Header title="Challenges & Achievements" />
      <div className="w-full flex flex-col gap-2">
        {achievements.map(achievement => (
          <AchievementCard
            description={achievement.description}
            title={achievement.title}
            solution={achievement.solution}
            result={achievement.result}
            notes={achievement.notes}
            key={achievement.id}
          />
        ))}
      </div>
    </>
  );
};

export default AchievementsPage;
