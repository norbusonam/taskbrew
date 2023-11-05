import { Popover, Transition } from "@headlessui/react";
import { Task } from "@taskbrew/prisma/db";
import {
  DAYS,
  MONTHS,
  getNumberOfDaysInMonth,
  isLaterThisWeek,
  isPastDue,
  isThisYear,
  isToday,
  isTomorrow,
  isYesterday,
} from "@taskbrew/utils/date";
import { Fragment, useState } from "react";
import { IconCalendar, IconLeft, IconRight } from "./icons";

type Props = {
  dueDate: Task["dueDate"];
  onDueDateChanged: (dueDate: Task["dueDate"]) => void;
};

export function DueDatePopover(props: Props) {
  const [currentMonth, setCurrentMonth] = useState(
    props.dueDate ? props.dueDate.getMonth() : new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState(
    props.dueDate ? props.dueDate.getFullYear() : new Date().getFullYear(),
  );
  const today = new Date();

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const onDateSelected = (date: Date) => {
    if (props.dueDate?.getTime() !== date.getTime()) {
      props.onDueDateChanged(date);
    }
  };

  const onClear = () => {
    if (props.dueDate) {
      props.onDueDateChanged(null);
    }
  };

  const onToday = () => {
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
  };

  return (
    <Popover className="relative" as="div">
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex items-center gap-1 rounded-md px-1 transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 ${
              props.dueDate && isPastDue(props.dueDate)
                ? "text-red-500"
                : props.dueDate && isToday(props.dueDate)
                ? "text-orange-500"
                : props.dueDate && isLaterThisWeek(props.dueDate)
                ? "text-blue-500"
                : "text-neutral-500"
            } ${open && "bg-neutral-200 dark:bg-neutral-800"}`}
          >
            <IconCalendar className="h-4 w-4" />
            <span className="text-sm">
              {props.dueDate
                ? isYesterday(props.dueDate)
                  ? "Yesterday"
                  : isToday(props.dueDate)
                  ? "Today"
                  : isTomorrow(props.dueDate)
                  ? "Tomorrow"
                  : isLaterThisWeek(props.dueDate)
                  ? DAYS[props.dueDate.getDay()].long
                  : isThisYear(props.dueDate)
                  ? `${
                      MONTHS[props.dueDate.getMonth()]
                    } ${props.dueDate.getDate()}`
                  : `${
                      MONTHS[props.dueDate.getMonth()]
                    } ${props.dueDate.getDate()} ${props.dueDate.getFullYear()}`
                : "Due date"}
            </span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute z-10 mt-1 w-48 origin-top-left overflow-scroll rounded-md bg-neutral-200 p-2 shadow-xl dark:bg-neutral-800">
              <div className="space-y-1">
                {/* current month and year with next and previous buttons */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevMonth}
                    className="rounded-md p-2 transition-colors hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
                    aria-label="Previous month"
                  >
                    <IconLeft className="h-3 w-3" />
                  </button>
                  <p className="text-sm">
                    {MONTHS[currentMonth]} {currentYear}
                  </p>
                  <button
                    onClick={nextMonth}
                    className="rounded-md p-2 transition-colors hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
                    aria-label="Next month"
                  >
                    <IconRight className="h-3 w-3" />
                  </button>
                </div>
                {/* days of the week (header) */}
                <div className="grid grid-cols-7">
                  {DAYS.map((day) => (
                    <p
                      key={day.short}
                      className="text-center text-xs text-neutral-500"
                    >
                      {day.short}
                    </p>
                  ))}
                </div>
                {/* days of the month */}
                <div className="grid grid-cols-7">
                  {/* empty cells */}
                  {Array(new Date(currentYear, currentMonth, 1).getDay())
                    .fill(0)
                    .map((_, i) => (
                      <div key={i}></div>
                    ))}
                  {/* days */}
                  {Array(getNumberOfDaysInMonth(currentMonth + 1, currentYear))
                    .fill(0)
                    .map((_, i) => (
                      <Popover.Button
                        key={i}
                        onClick={() =>
                          onDateSelected(
                            new Date(
                              currentYear,
                              currentMonth,
                              i + 1,
                              23,
                              59,
                              59,
                            ),
                          )
                        }
                        className={`${
                          // selected date styles
                          props.dueDate &&
                          props.dueDate.getDate() === i + 1 &&
                          props.dueDate.getMonth() === currentMonth &&
                          props.dueDate.getFullYear() === currentYear &&
                          "bg-neutral-300 font-bold dark:bg-neutral-700"
                        } ${
                          // today styles
                          today.getDate() === i + 1 &&
                          today.getMonth() === currentMonth &&
                          today.getFullYear() === currentYear &&
                          "bg-red-400 text-white"
                        } aspect-square rounded-md p-1 text-center text-xs transition-colors hover:bg-neutral-300 hover:text-black active:bg-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white dark:active:bg-neutral-600`}
                      >
                        {i + 1}
                      </Popover.Button>
                    ))}
                </div>
                {/* today and clear buttons */}
                <div className="flex justify-between">
                  <button
                    className="rounded-md p-1  text-center text-xs transition-colors hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
                    onClick={onToday}
                  >
                    Go to today
                  </button>
                  <Popover.Button
                    className="rounded-md p-1 text-center text-xs transition-colors hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
                    onClick={onClear}
                  >
                    Clear
                  </Popover.Button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
