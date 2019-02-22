import { combineReducers } from "redux";
import authReducer from "./authReducer";
import studyReducer from "./studyReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  study: studyReducer
});

export default rootReducer;
