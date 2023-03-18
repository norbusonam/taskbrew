import { setTodos, addTodo, removeTodo, updateTodo } from '../slices/todo-slice';
import { Todo } from '../types';
import { useAppDispatch, useAppSelector } from './use-redux';

export const useTodos = () => {
  const todos = useAppSelector(state => state.todo.todos);
  const dispatch = useAppDispatch();

  const onGetTodos = (todos: Todo[]) => {
    dispatch(setTodos(todos));
  };

  const onCreateTodo = (todo: Todo) => {
    dispatch(addTodo(todo));
  };

  const onDeleteTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  const onUpdateTodo = (todo: Todo) => {
    dispatch(updateTodo(todo));
  };

  return {
    todos,
    onGetTodos,
    onCreateTodo,
    onDeleteTodo,
    onUpdateTodo,
  };
};
