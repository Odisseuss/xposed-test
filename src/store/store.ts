import { create } from "domain";
import { createStore } from "redux";
import recordsReducer from "./slices/records";

export default createStore(recordsReducer);
