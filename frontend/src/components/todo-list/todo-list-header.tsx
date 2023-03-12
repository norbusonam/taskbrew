import React from 'react';

type TodoListHeaderProps = {
  header: string;
  subheader?: string;
};

export const TodoListHeader: React.FC<TodoListHeaderProps> = props => {
  return (
    <div className="card bg-base-200">
      <div className="card-title">{props.header}</div>
      <div className="card-body">{props.subheader}</div>
    </div>
  );
};
