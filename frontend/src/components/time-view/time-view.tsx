import React, { useEffect, useState } from 'react';
import { useViewport } from '../../hooks';
import { Todo } from '../../types';
import { getYesterday } from './utils';
import { LeftNav } from './left-nav';
import { RightNav } from './right-nav';
import { DayList } from './day-list';

type TimeViewProps = {
  todos: Todo[];
};

export const TimeView: React.FC<TimeViewProps> = props => {
  const [startDate, setStartDate] = useState(getYesterday());
  const [numDays, setNumDays] = useState(7);
  const [hideCompleted, setHideCompleted] = useState(false);
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
      <LeftNav shiftStartDate={shiftStartDate} setStartDate={setStartDate} numDays={numDays} />
      {[...Array(numDays)].map((_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        return (
          <div className="flex-1" key={date.toDateString()}>
            <DayList
              date={date}
              hideCompleted={hideCompleted}
              todos={props.todos.filter(todo => new Date(todo.due).toDateString() === date.toDateString())}
            />
          </div>
        );
      })}
      <RightNav
        shiftStartDate={shiftStartDate}
        setStartDate={setStartDate}
        numDays={numDays}
        hideCompleted={hideCompleted}
        setHideCompleted={setHideCompleted}
      />
    </div>
  );
};
