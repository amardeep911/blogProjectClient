import { combineReducers } from "redux";
import UserReducer from "./user_reducer";
const reducers = combineReducers({
  user: UserReducer,
});
export default reducers;
