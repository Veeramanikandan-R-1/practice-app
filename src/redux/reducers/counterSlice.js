import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "fetchuser",
  async (state, action) => {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      response = await response.json();
      console.log(response);
      return response;
    } catch (error) {
      throw "error";
    }
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    users: {
      data: [],
      loading: false,
      error: null,
    },
  },
  reducers: {
    increment: (state, action) => {
      state.count += 1;
      return state;
    },
    decrement: (state, action) => {
      state.count -= 1;
      return state;
    },
    increaseByValue: (state, action) => {
      console.log("action", action);
      state.count += action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.users.loading = true;
        state.users.data = [];
        state.users.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.data = action.payload;
        state.users.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.users.loading = false;
        state.users.data = [];
        state.users.error = action.error.message;
      });
  },
});

export const { increment, decrement, increaseByValue } = counterSlice.actions;

export default counterSlice.reducer;
