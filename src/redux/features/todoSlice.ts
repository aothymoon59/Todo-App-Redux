import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TTodo = {
  id: string;
  title: string;
  description: string;
  priority: string;
  isCompleted?: boolean;
};

type TInitialState = {
  todos: TTodo[];
};

const initialState: TInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.todos.find((item) => item.id === action.payload);
      task!.isCompleted = !task?.isCompleted;
      state.todos = state.todos.sort((a, b) => {
        return a?.isCompleted - b?.isCompleted;
      });
    },
    filterTodo: (state, action: PayloadAction<string>) => {
      if (action.payload === "all") {
        state!.todos = state.todos;
      }
      state.todos = state.todos.filter(
        (item) => item.priority === action.payload
      );
    },
  },
});

export const { addTodo, removeTodo, toggleComplete, filterTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
