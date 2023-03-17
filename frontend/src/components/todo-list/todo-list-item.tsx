import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Todo } from '../../types';

type TodoListItemProps = {
  todo: Todo;
};

export const TodoListItem: React.FC<TodoListItemProps> = props => {
  return (
    <div>
      <p>
        <ReactMarkdown>{props.todo.title}</ReactMarkdown>
      </p>
    </div>
  );
};
