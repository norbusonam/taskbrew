import { v4 as uuidv4 } from 'uuid';
import { api, CreateTaskBody, UpdateTaskBody } from '../api';
import { taskActions } from '../slices/task-slice';
import { useAppDispatch, useAppSelector } from './use-redux';
import { useToast } from './use-toast';

export const useTasks = () => {
  const tasks = useAppSelector(state => state.task.tasks);
  const dispatch = useAppDispatch();
  const { makeToast } = useToast();

  const getAllTasks = () => {
    api.getTasks().then(
      res => {
        dispatch(taskActions.setTasks(res.data.tasks));
      },
      err => {
        console.log(err);
      },
    );
  };

  const createTask = (task: CreateTaskBody) => {
    api.createTask(task).then(
      res => {
        dispatch(taskActions.addTask(res.data.task));
        makeToast({
          id: uuidv4(),
          title: 'Task Created 🎉',
          description: 'Task has been created successfully',
          type: 'success',
          duration: 5000,
        });
      },
      err => {
        console.log(err);
      },
    );
  };

  const deleteTask = (id: string) => {
    api.deleteTask(id).then(
      res => {
        dispatch(taskActions.removeTask(id));
        makeToast({
          id: uuidv4(),
          title: 'Task Deleted 🗑️',
          description: 'Task has been deleted successfully',
          type: 'error',
          duration: 5000,
        });
      },
      err => {
        console.log(err);
      },
    );
  };

  const updateTask = (id: string, task: UpdateTaskBody) => {
    api.updateTask(id, task).then(
      res => {
        dispatch(taskActions.updateTask(res.data.task));
        makeToast({
          id: uuidv4(),
          title: 'Task Updated ✅',
          description: 'Task has been updated successfully',
          type: 'success',
          duration: 5000,
        });
      },
      err => {
        console.log(err);
      },
    );
  };

  return {
    tasks,
    getAllTasks,
    createTask,
    deleteTask,
    updateTask,
  };
};
