import {
  RECENT_TYPE_MONTH,
  RECENT_TYPE_TODAY,
  RECENT_TYPE_WEEK,
  RECENT_TYPE_YEAR,
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

export const addRefreshedDataForGameId = (
  oldGames,
  gameId,
  gameRefreshData
) => {
  let newGames = [];
  newGames = oldGames.map((game) => {
    if (game.id == gameId) {
      let newGame = gameRefreshData;
      return newGame;
    } else {
      return game;
    }
  });
  return newGames;
};

export const getAllAchievementsForAllGames = (games) => {
  let allAchievements = [];
  games.forEach((game) => {
    let gameAchievements = game.achievements;
    gameAchievements.forEach((achievement) => {
      if (achievement.achieved == 1) {
        allAchievements.push(achievement);
      }
    });
  });
  return allAchievements;
};

export const getAllAchievementsUnlockedByType = (type, achievements) => {
  console.log("JEEVA", type, achievements.length);
  let newAchievements = [];
  if (achievements.length > 0) {
    if (type == RECENT_TYPE_TODAY) {
      console.log("IN TODAY");
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate());
      let timeUTC;
      timeUTC = date.getTime() / 1000;

      newAchievements = achievements.filter(
        (achievement) =>
          achievement.achieved == 1 && achievement.unlocktime > timeUTC
      );
    }
    if (type == RECENT_TYPE_WEEK) {
      console.log("IN WEEK");
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - 7);
      let timeUTC;
      timeUTC = date.getTime() / 1000;

      newAchievements = achievements.filter(
        (achievement) =>
          achievement.achieved == 1 && achievement.unlocktime > timeUTC
      );
    }
    if (type == RECENT_TYPE_MONTH) {
      console.log("IN MONTH");
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - 30);
      let timeUTC;
      timeUTC = date.getTime() / 1000;

      newAchievements = achievements.filter(
        (achievement) =>
          achievement.achieved == 1 && achievement.unlocktime > timeUTC
      );
    }

    if (type == RECENT_TYPE_YEAR) {
      console.log("IN YEAR");
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - 365);
      let timeUTC;
      timeUTC = date.getTime() / 1000;

      newAchievements = achievements.filter(
        (achievement) =>
          achievement.achieved == 1 && achievement.unlocktime > timeUTC
      );
    }
  }
  console.log("RETURNING", newAchievements.length);
  return newAchievements;
};
