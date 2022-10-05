import { combineReducers } from "redux";
import steamReducer from "./steam.reducer";
import menuReducer from "./menu.reducer";

const rootReducer = combineReducers({
  steam: steamReducer,
  menu: menuReducer,
});

export default rootReducer;
