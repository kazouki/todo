import { combineReducers } from "redux";
import list from "./list/reducer";
import appState from "./appState/reducer";

export default combineReducers({
  appState,
  list,
});
