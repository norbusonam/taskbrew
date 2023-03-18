import React from 'react';

type TodoListHeaderProps = {
  header: string;
  subheader?: string;
  indicator?: string;
  isDisabled?: boolean;
};

export const TodoListHeader: React.FC<TodoListHeaderProps> = props => {
  return (
    <div
      className={`card bg-base-200 shadow-md mb-2 ${props.indicator && 'indicator w-full'} ${
        props.isDisabled && 'line-through'
      }`}>
      {props.indicator && (
        <span className="indicator-item badge badge-primary indicator-center">{props.indicator}</span>
      )}
      <div className="card-body items-center">
        <div className="card-title">{props.header}</div>
        <p>{props.subheader}</p>
      </div>
    </div>
  );
};
