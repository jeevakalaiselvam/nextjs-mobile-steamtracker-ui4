import { combineReducers } from "redux";
import steamReducer from "./steam.reducer";
import settingsReducer from "./settings.reducer";

const rootReducer = combineReducers({
  steam: steamReducer,
  settings: settingsReducer,
});

export default rootReducer;
