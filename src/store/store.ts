import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import recordsReducer from "./slices/records";
import authReducer from "./slices/auth";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  records: recordsReducer,
});
const enhancers = compose(
  applyMiddleware(thunk),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
export default createStore(rootReducer, enhancers);
