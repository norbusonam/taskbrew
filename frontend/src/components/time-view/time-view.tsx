import React, { useState } from 'react';
import { Task } from '../../types';
import { getYesterday } from './utils';
import { LeftNav } from './left-nav';
import { RightNav } from './right-nav';
import { DayList } from './day-list';
import { useNumLists } from '../../hooks';

type TimeViewProps = {
  tasks: Task[];
};

export const TimeView: React.FC<TimeViewProps> = props => {
  const [startDate, setStartDate] = useState(getYesterday());
  const { numLists: numDays } = useNumLists();
  const [hideCompleted, setHideCompleted] = useState(false);

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
              tasks={props.tasks.filter(task => task.due && new Date(task.due).toDateString() === date.toDateString())}
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
