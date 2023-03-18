import React, { useEffect, useState } from 'react';
import { ArrowDoubleLeftIcon, ArrowDoubleRightIcon, ArrowLeftIcon, ArrowRightIcon, HomeIcon } from '../../assets';
import { useViewport } from '../../hooks';
import { Todo } from '../../types';
import { TodoList } from '../todo-list';

const DAY_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getFirstDayOfWeek = () => {
  const firstDayOfWeek = new Date();
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
  return firstDayOfWeek;
};

type TimeViewProps = {
  todos: Todo[];
};

export const TimeView: React.FC<TimeViewProps> = props => {
  const [startDate, setStartDate] = useState(getFirstDayOfWeek());
  const [numDays, setNumDays] = useState(7);
  const { width } = useViewport();

  useEffect(() => {
    if (width < 600) {
      setNumDays(1);
    } else if (width < 1000) {
      setNumDays(3);
    } else if (width < 1300) {
      setNumDays(5);
    } else {
      setNumDays(7);
    }
  }, [width]);

  const shiftStartDate = (shift: number) => {
    setStartDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + shift);
      return newDate;
    });
  };

  return (
    <div className="flex flex-row w-full gap-2 p-2">
      <div className="flex flex-col gap-2">
        <button className="btn btn-ghost btn-square" onClick={() => shiftStartDate(-1)}>
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <button
          className={`btn btn-ghost btn-square ${numDays === 1 && 'hidden'}`}
          onClick={() => shiftStartDate(-numDays)}>
          <ArrowDoubleLeftIcon className="h-6 w-6" />
        </button>
        <button className="btn btn-ghost btn-square" onClick={() => setStartDate(getFirstDayOfWeek())}>
          <HomeIcon className="h-6 w-6" />
        </button>
      </div>
      {[...Array(numDays)].map((_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        return (
          <div className="flex-1">
            <TodoList
              key={date.toDateString()}
              todos={props.todos.filter(todo => new Date(todo.due).toDateString() === date.toDateString())}
              header={DAY_OF_WEEK[date.getDay()]}
              subheader={date.toLocaleDateString()}
            />
          </div>
        );
      })}
      <div className="flex flex-col gap-2">
        <button className="btn btn-ghost btn-square" onClick={() => shiftStartDate(1)}>
          <ArrowRightIcon className="h-6 w-6" />
        </button>
        <button
          className={`btn btn-ghost btn-square ${numDays === 1 && 'hidden'}`}
          onClick={() => shiftStartDate(numDays)}>
          <ArrowDoubleRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
