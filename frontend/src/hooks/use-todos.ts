import { v4 as uuidv4 } from 'uuid';
import { setTodos, addTodo, removeTodo, updateTodo } from '../slices/todo-slice';
import { Todo } from '../types';
import { useAppDispatch, useAppSelector } from './use-redux';
import { useToast } from './use-toast';

export const useTodos = () => {
  const todos = useAppSelector(state => state.todo.todos);
  const dispatch = useAppDispatch();
  const { makeToast } = useToast();

  const onGetTodos = (todos: Todo[]) => {
    dispatch(setTodos(todos));
  };

  const onCreateTodo = (todo: Todo) => {
    dispatch(addTodo(todo));
    makeToast({
      id: uuidv4(),
      title: 'Task Created 🚀',
      description: 'Task has been created successfully',
      type: 'success',
      duration: 5000,
    });
  };

  const onDeleteTodo = (id: string) => {
    dispatch(removeTodo(id));
    makeToast({
      id: uuidv4(),
      title: 'Task Deleted 🗑️',
      description: 'Task has been deleted successfully',
      type: 'info',
      duration: 5000,
    });
  };

  const onUpdateTodo = (todo: Todo) => {
    dispatch(updateTodo(todo));
    makeToast({
      id: uuidv4(),
      title: 'Task Updated ☕️',
      description: 'Task has been updated successfully',
      type: 'info',
      duration: 5000,
    });
  };

  return {
    todos,
    onGetTodos,
    onCreateTodo,
    onDeleteTodo,
    onUpdateTodo,
  };
};
