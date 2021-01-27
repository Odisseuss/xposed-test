import { createSlice } from "@reduxjs/toolkit";

export interface UserRecord {
  birthYear: number;
  email: string;
}
// Try to get initial state from local storage
const initialRecordsState: UserRecord[] = [];

export const recordsSlice = createSlice({
  name: "records",
  initialState: {
    records: initialRecordsState,
  },
  reducers: {
    addRecord: (state, action: { payload: UserRecord; type: string }) => {
      state.records.push(action.payload);
    },
    setRecords: (state, action: { payload: UserRecord[]; type: string }) => {
      state.records = action.payload;
    },
  },
});

export const { addRecord, setRecords } = recordsSlice.actions;
export const selectRecords = (state: { records: UserRecord[] }): UserRecord[] =>
  state.records;

export default recordsSlice.reducer;
