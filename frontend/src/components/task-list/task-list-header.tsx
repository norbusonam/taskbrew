import React from 'react';

type TaskListHeaderProps = {
  header: string;
  subheader?: string;
  indicatorColor?: 'primary' | 'secondary';
  indicator?: string;
  isDisabled?: boolean;
};

export const TaskListHeader: React.FC<TaskListHeaderProps> = props => {
  return (
    <div
      className={`card bg-base-200 shadow-md mb-2 ${props.indicator && 'indicator w-full'} ${
        props.isDisabled && 'line-through'
      }`}>
      {props.indicator && (
        <span
          className={
            'indicator-item indicator-center badge ' +
            (props.indicatorColor === 'primary'
              ? 'badge-primary'
              : props.indicatorColor === 'secondary'
              ? 'badge-secondary'
              : '')
          }>
          {props.indicator}
        </span>
      )}
      <div className="card-body items-center">
        <div className="card-title">{props.header}</div>
        <p>{props.subheader}</p>
      </div>
    </div>
  );
};
