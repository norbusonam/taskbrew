import React from 'react';

type TodoListHeaderProps = {
  header: string;
  subheader?: string;
};

export const TodoListHeader: React.FC<TodoListHeaderProps> = props => {
  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body items-center">
        <div className="card-title">{props.header}</div>
        <p>{props.subheader}</p>
      </div>
    </div>
  );
};
