import React from 'react';
import { Todo } from '../../types';
import { TodoListHeader } from './todo-list-header';
import { TodoListItem } from './todo-list-item';

type TodoListProps = {
  header: string;
  subheader?: string;
  todos: Todo[];
  isDisabled?: boolean;
};

export const TodoList: React.FC<TodoListProps> = props => {
  return (
    <div className="mb-4">
      <TodoListHeader header={props.header} subheader={props.subheader} isDisabled={props.isDisabled} />
      <div className="card card-compact bg-base-200 shadow-md min-h-[32rem]">
        <div className="card-body">
          {props.todos.map(todo => (
            <TodoListItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
};
