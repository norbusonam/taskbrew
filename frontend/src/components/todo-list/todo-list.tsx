import React from 'react';
import { Todo } from '../../types';
import { TodoListHeader } from './todo-list-header';
import { TodoListItem } from './todo-list-item';

type TodoListProps = {
  header: string;
  subheader?: string;
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = props => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <TodoListHeader header={props.header} subheader={props.subheader} />
      <div className="card bg-base-200">
        {props.todos.map(todo => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};
