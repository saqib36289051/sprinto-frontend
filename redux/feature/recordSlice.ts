import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RecordState {
  value: number;
}

const initialState: RecordState = {
  value: 10,
};

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = recordSlice.actions;

export default recordSlice.reducer;
