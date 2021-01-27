import { createSlice } from "@reduxjs/toolkit";
import { getRecordsFromStorage } from "../../utils/getRecordsFromStorage";

export interface UserRecord {
  birthYear: number;
  email: string;
}
// Try to get initial state from local storage
const initialRecordsState: UserRecord[] = getRecordsFromStorage() || [];

export const recordsSlice = createSlice({
  name: "records",
  initialState: {
    records: initialRecordsState,
  },
  reducers: {
    addRecord: (state, action: { payload: UserRecord; type: string }) => {
      state.records.push(action.payload);
    },
  },
});

export const { addRecord } = recordsSlice.actions;

export default recordsSlice.reducer;
