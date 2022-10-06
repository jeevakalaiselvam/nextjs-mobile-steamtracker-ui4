import axios from "axios";
import { API_GET_GAMES } from "../../helper/urlHelper";
import {
  FETCH_ALL_GAMES_ERROR,
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
  SET_HIDDEN_ACHIEVEMENTS_GAME,
} from "../types/steam.types";

export const fetchAllGames = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ALL_GAMES_REQUEST });
    return axios.get(API_GET_GAMES).then(
      (data) => {
        dispatch({ type: FETCH_ALL_GAMES_SUCCESS, payload: data.data.data });
      },
      (error) => {
        dispatch({ type: FETCH_ALL_GAMES_ERROR, payload: error });
      }
    );
  };
};

export const setHiddenAchievementsForGame = (gameId, hiddenAchievements) => {
  return (dispatch) => {
    return dispatch({
      type: SET_HIDDEN_ACHIEVEMENTS_GAME,
      payload: { gameId, hiddenAchievements },
    });
  };
};
