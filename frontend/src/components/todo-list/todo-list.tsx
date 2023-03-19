import React from 'react';
import { Todo } from '../../types';
import { TodoListHeader } from './todo-list-header';
import { TodoListItem } from './todo-list-item';

type TodoListProps = {
  header: string;
  subheader?: string;
  todos: Todo[];
  indicatorColor?: 'primary' | 'secondary';
  indicator?: string;
  isDisabled?: boolean;
};

export const TodoList: React.FC<TodoListProps> = props => {
  return (
    <div className="mb-4">
      <TodoListHeader
        header={props.header}
        subheader={props.subheader}
        isDisabled={props.isDisabled}
        indicatorColor={props.indicatorColor}
        indicator={props.indicator}
      />
      <div className="card card-compact bg-base-200 shadow-md min-h-[32rem]">
        <div className="card-body gap-0">
          {props.todos.map(todo => (
            <TodoListItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
};
