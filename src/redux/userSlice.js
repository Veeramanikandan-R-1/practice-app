import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("fetchUser", async () => {
  let result = await fetch("https://jsonplaceholder.typicode.com/users");
  result = await result.json();
  console.log(result);
  result = result.map((user) => user.name);
  return result;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    loading: false,
    error: null,
    searchResult: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.searchResult = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload;
      });
  },
});

export const { setData, setSearchData } = userSlice.actions;

export default userSlice.reducer;
