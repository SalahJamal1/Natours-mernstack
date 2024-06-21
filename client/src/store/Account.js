import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Getuser, Login } from "../service/Api";

export const Accountlogin = createAsyncThunk(
  "Account/Login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Login(data);
      return res.data.user;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);
export const AccountgetUser = createAsyncThunk(
  "Account/getUser",
  async (p = null, { rejectWithValue }) => {
    try {
      const res = await Getuser();
      return res.data.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const Account = createSlice({
  name: "Account",
  initialState: {
    Auth: false,
    user: null,
    error: "",
    isLoading: true,
  },
  reducers: {
    logout(state) {
      state.Auth = false;
      state.user = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(Accountlogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.Auth = true;
      })
      .addCase(Accountlogin.rejected, (state, action) => {
        state.Auth = false;
        state.error = action.payload;
      })
      .addCase(AccountgetUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AccountgetUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.Auth = true;
        state.isLoading = false;
      })
      .addCase(AccountgetUser.rejected, (state, action) => {
        state.Auth = false;
        state.error = action.payload;
        state.isLoading = false;
      }),
});

export const { logout, getUser } = Account.actions;
