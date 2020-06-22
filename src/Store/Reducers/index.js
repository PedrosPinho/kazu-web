import { combineReducers } from "redux";

import { user } from "./user";
import { info } from "./info";

export const Reducers = combineReducers({
  user,
  info
});
