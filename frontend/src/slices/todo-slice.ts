import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types';

type TodoState = {
  todos: Todo[];
};

type TodoReducer = {
  setTodos: (state: TodoState, action: { payload: Todo[] }) => void;
  addTodo: (state: TodoState, action: { payload: Todo }) => void;
  removeTodo: (state: TodoState, action: { payload: string }) => void;
  updateTodo: (state: TodoState, action: { payload: Todo }) => void;
};

export const todoSlice = createSlice<TodoState, TodoReducer>({
  name: 'todo',
  initialState: {
    todos: [],
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      state.todos[index] = action.payload;
    },
  },
});

export const { setTodos, addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
