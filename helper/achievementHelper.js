import {
  SORT_ACHIEVEMENTS_ALL,
  SORT_ACHIEVEMENTS_LOCKED,
  SORT_ACHIEVEMENTS_UNLOCKED,
  SORT_GAMES_COMPLETION,
  SORT_GAMES_NAMES_AZ,
  SORT_GAMES_NAMES_ZA,
} from "./sortHelper";

export const calculateRecentHistory = (games) => {
  let recentHistory = {};

  let recent30Dates = new Array(14).fill(1).map((item, index) => index);

  recent30Dates.forEach((dayIndex) => {
    recentHistory[dayIndex] = [];
    let dateOld = new Date();
    dateOld.setHours(0, 0, 0, 0);
    dateOld.setDate(dateOld.getDate() - dayIndex);
    let timeUTCOld;
    timeUTCOld = dateOld.getTime() / 1000;

    let dateNew = new Date();
    dateNew.setHours(0, 0, 0, 0);
    dateNew.setDate(dateNew.getDate() - dayIndex + 1);
    let timeUTCNew;
    timeUTCNew = dateNew.getTime() / 1000;

    if (games.length > 0) {
      games.forEach((game) => {
        game.achievements.forEach((achievement) => {
          if (achievement.achieved == 1) {
            if (
              achievement.unlocktime > timeUTCOld &&
              achievement.unlocktime < timeUTCNew
            ) {
              recentHistory[dayIndex].push(achievement);
            }
          }
        });
      });
    }
  });

  return { recentHistory };
};

export const getAchievementsSortedByUserOptions = (achievements, sortType) => {
  let newAchivements = [];

  if (sortType === SORT_ACHIEVEMENTS_ALL) {
    newAchivements = achievements;
  } else if (sortType === SORT_ACHIEVEMENTS_LOCKED) {
    newAchivements = achievements.filter(
      (achievement) => achievement.achieved == 0
    );
  } else if (sortType === SORT_ACHIEVEMENTS_UNLOCKED) {
    newAchivements = achievements.filter(
      (achievement) => achievement.achieved == 1
    );
  } else {
    newAchivements = achievements;
  }

  return newAchivements;
};

export const getGamesSortedByUserOptions = (games, sortType) => {
  let newGames = [];

  if (sortType === SORT_GAMES_COMPLETION) {
    newGames = games.sort(
      (game1, game2) => game2.completion - game1.completion
    );
  } else if (sortType === SORT_GAMES_NAMES_AZ) {
    newGames = games.sort((game1, game2) => {
      if (game1.name < game2.name) {
        return -1;
      } else {
        return 1;
      }
    });
  } else if (sortType === SORT_GAMES_NAMES_ZA) {
    newGames = games.sort((game1, game2) => {
      if (game2.name < game1.name) {
        return -1;
      } else {
        return 1;
      }
    });
  } else {
    newGames = games;
  }

  return newGames;
};
