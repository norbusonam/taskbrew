import React from 'react';
import { Todo } from '../../types';

type TodoListItemProps = {
  todo: Todo;
};

export const TodoListItem: React.FC<TodoListItemProps> = props => {
  return (
    <div>
      <h3>{props.todo.title}</h3>
    </div>
  );
};
