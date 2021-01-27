import { createSlice } from "@reduxjs/toolkit";

export interface UserRecord {
  birthYear: number;
  email: string;
}
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
  },
});

export const { addRecord } = recordsSlice.actions;

export default recordsSlice.reducer;
