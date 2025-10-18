import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSlice } from "../types/types";
import { EAuthRoles } from "../../types/types";

const initialState: AuthSlice = {
  selectRole: null,
};

export const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  selectors: {
    selectAuthRole: (state) => state.selectRole,
  },
  reducers: (create) => ({
    setAuthRole: create.reducer(
      (state, { payload }: PayloadAction<EAuthRoles>) => {
        state.selectRole = payload;
      }
    ),
  }),
});

export const authSliceActions = authSlice.actions;
export const { selectAuthRole } = authSlice.selectors;
