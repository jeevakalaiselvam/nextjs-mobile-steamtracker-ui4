import { LEVEL_MODIFIER, READ_JSON } from "./storageHelper";

export const getDefaultLevelPreference = () => {
  if (typeof window !== "undefined") {
    return Number(READ_JSON(LEVEL_MODIFIER, 1000));
  }
};

export const getXPDetailsForAllGames = (games) => {
  let totalXPFromAllGames = 0;
  let obtainedXPFromAllGames = 0;

  if (games.length > 0) {
    games.forEach((game) => {
      let gameAchievements = game.achievements;
      gameAchievements.forEach((achievement) => {
        if (achievement.achieved == 1) {
          obtainedXPFromAllGames =
            obtainedXPFromAllGames +
            getXPForAchievement(achievement.percentage);
        }
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
  };
};

export const getXPForAchievement = (percentage) => {
  let gamePercentage = Number(percentage);
  if (gamePercentage <= 1) {
    return 1000;
  } else if (gamePercentage > 1 && gamePercentage <= 5) {
    return 500;
  } else if (gamePercentage > 5 && gamePercentage <= 10) {
    return 250;
  } else if (gamePercentage > 10 && gamePercentage <= 25) {
    return 100;
  } else if (gamePercentage > 25 && gamePercentage <= 50) {
    return 75;
  } else if (gamePercentage > 50 && gamePercentage <= 75) {
    return 50;
  } else {
    return 25;
  }
};
