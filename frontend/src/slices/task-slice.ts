import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../types';

type TaskState = {
  tasks: Task[];
};

type TaskReducer = {
  setTasks: (state: TaskState, action: { payload: Task[] }) => void;
  addTask: (state: TaskState, action: { payload: Task }) => void;
  removeTask: (state: TaskState, action: { payload: string }) => void;
  updateTask: (state: TaskState, action: { payload: Task }) => void;
};

export const taskSlice = createSlice<TaskState, TaskReducer>({
  name: 'task',
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
  },
});

export const { setTasks, addTask, removeTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
