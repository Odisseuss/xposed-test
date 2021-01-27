import { create } from "domain";
import { combineReducers, createStore } from "redux";
import recordsReducer from "./slices/records";
import authReducer from "./slices/auth";

const rootReducer = combineReducers({
  auth: authReducer,
  records: recordsReducer,
});
export default createStore(rootReducer);
