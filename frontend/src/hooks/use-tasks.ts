import { v4 as uuidv4 } from 'uuid';
import { setTasks, addTask, removeTask, updateTask } from '../slices/task-slice';
import { Task } from '../types';
import { useAppDispatch, useAppSelector } from './use-redux';
import { useToast } from './use-toast';

export const useTasks = () => {
  const tasks = useAppSelector(state => state.task.tasks);
  const dispatch = useAppDispatch();
  const { makeToast } = useToast();

  const onGetTasks = (tasks: Task[]) => {
    dispatch(setTasks(tasks));
  };

  const onCreateTask = (task: Task) => {
    dispatch(addTask(task));
    makeToast({
      id: uuidv4(),
      title: 'Task Created 🚀',
      description: 'Task has been created successfully',
      type: 'success',
      duration: 5000,
    });
  };

  const onDeleteTask = (id: string) => {
    dispatch(removeTask(id));
    makeToast({
      id: uuidv4(),
      title: 'Task Deleted 🗑️',
      description: 'Task has been deleted successfully',
      type: 'info',
      duration: 5000,
    });
  };

  const onUpdateTask = (task: Task) => {
    dispatch(updateTask(task));
    makeToast({
      id: uuidv4(),
      title: 'Task Updated ☕️',
      description: 'Task has been updated successfully',
      type: 'info',
      duration: 5000,
    });
  };

  return {
    tasks,
    onGetTasks,
    onCreateTask,
    onDeleteTask,
    onUpdateTask,
  };
};
