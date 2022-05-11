<<<<<<< HEAD
﻿import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponse, UserType } from "./auth.types";
=======
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponse, UserType } from "./auth.type";
>>>>>>> develop

interface UsersState {
  user: UserType | null;
  accessToken: string;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string;
  isLoggedIn: boolean;
}
const initialState: UsersState = {
  user: {},
  accessToken: "",
  loading: "idle",
  error: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { data } }: PayloadAction<IResponse>
    ) => {
      state.user = data.user;
      state.accessToken = data.accessToken;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;