import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      return state;
    },
    updateTasks: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addTask, updateTasks } = taskSlice.actions;

export default taskSlice.reducer;
