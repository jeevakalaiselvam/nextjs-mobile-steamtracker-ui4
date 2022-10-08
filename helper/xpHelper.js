import { LEVEL_MODIFIER, READ_JSON } from "./storageHelper";

export const getDefaultLevelPreference = () => {
  if (typeof window !== "undefined") {
    return Number(READ_JSON(LEVEL_MODIFIER, 1000));
  }
};

export const getXPDetailsForAllGames = (games) => {
  let totalXPFromAllGames = 0;
  let obtainedXPFromAllGames = 0;
  let completedTrophies = 0;
  let totalTrophies = 0;

  if (games.length > 0) {
    games.forEach((game) => {
      let gameAchievements = game.achievements;
      gameAchievements.forEach((achievement) => {
        if (achievement.achieved == 1) {
          completedTrophies = completedTrophies + 1;
          obtainedXPFromAllGames =
            obtainedXPFromAllGames +
            getXPForAchievement(achievement.percentage);
        }
        totalTrophies = totalTrophies + 1;
        totalXPFromAllGames =
          totalXPFromAllGames + getXPForAchievement(achievement.percentage);
      });
    });
  }
  return {
    obtainedXPFromAllGames: Number(obtainedXPFromAllGames),
    totalXPFromAllGames: Number(totalXPFromAllGames),
    currentLevel: Number(
      Math.floor(obtainedXPFromAllGames / getDefaultLevelPreference())
    ),
    xpRequiredForLevelUp:
      getDefaultLevelPreference() -
      (obtainedXPFromAllGames % getDefaultLevelPreference()),
    completedTrophies,
    totalTrophies,
  };
};

export const getXPForAchievement = (percentage) => {
  let gamePercentage = Number(percentage);
  if (gamePercentage <= 1) {
    return 100;
  } else if (gamePercentage > 1 && gamePercentage <= 5) {
    return 75;
  } else if (gamePercentage > 5 && gamePercentage <= 10) {
    return 50;
  } else if (gamePercentage > 10 && gamePercentage <= 25) {
    return 30;
  } else if (gamePercentage > 25 && gamePercentage <= 50) {
    return 20;
  } else if (gamePercentage > 50 && gamePercentage <= 75) {
    return 15;
  } else {
    return 10;
  }
};
