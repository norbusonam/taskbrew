import { Popover, Switch, Transition } from "@headlessui/react";
import { Task } from "@taskbrew/prisma/db";
import {
  DAYS,
  MONTHS,
  getNumberOfDaysInMonth,
  getTimeFromDate,
  isLaterThisWeek,
  isOverdue,
  isThisYear,
  isToday,
  isTomorrow,
  isYesterday,
  parseTimeInputToDate,
} from "@taskbrew/utils/date";
import { Fragment, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IconCalendar, IconLeft, IconRight } from "./icons";

type Props = {
  dueDate: Task["dueDate"];
  dueDateIncludesTime: Task["dueDateIncludesTime"];
  onDueDateChanged: (dueDate: Task["dueDate"]) => void;
  onDueDateIncludesTimeChanged: (dueDateIncludesTime: boolean) => void;
  fadedAppearance?: boolean;
};

export function DueDatePopover(props: Props) {
  const [currentMonth, setCurrentMonth] = useState(
    props.dueDate ? props.dueDate.getMonth() : new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState(
    props.dueDate ? props.dueDate.getFullYear() : new Date().getFullYear(),
  );
  const [timeValue, setTimeValue] = useState(
    props.dueDate ? getTimeFromDate(props.dueDate) : "",
  );
  const timeInputRef = useRef<HTMLInputElement>(null);
  const today = new Date();

  useEffect(() => {
    if (props.dueDate) {
      setTimeValue(getTimeFromDate(props.dueDate));
    }
  }, [props.dueDate]);

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

  const handleTimeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      timeInputRef.current?.blur();
    }
  };

  return (
    <Popover className="relative" as="div">
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex items-center gap-1 rounded-md px-1 transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 ${
              props.fadedAppearance
                ? "text-neutral-500"
                : props.dueDate &&
                  isOverdue(props.dueDate, props.dueDateIncludesTime)
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
              {
                // show time if due date includes time
                props.dueDateIncludesTime &&
                  props.dueDate &&
                  ` at ${getTimeFromDate(props.dueDate)}`
              }
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
            <Popover.Panel className="absolute z-10 mt-1 w-48 origin-top-left rounded-md bg-neutral-200 p-2 shadow-xl dark:bg-neutral-800">
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
                      <button
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
                      </button>
                    ))}
                </div>
                {/* today and clear buttons */}
                <div className="flex justify-between">
                  <button
                    className="rounded-md p-1  text-center text-xs transition-colors hover:bg-neutral-300 active:bg-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
                    disabled={
                      currentMonth === new Date().getMonth() &&
                      currentYear === new Date().getFullYear()
                    }
                    onClick={onToday}
                  >
                    Go to today
                  </button>
                  <button
                    className="rounded-md p-1 text-center text-xs transition-colors hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
                    onClick={onClear}
                  >
                    Clear
                  </button>
                </div>
                {/* show includes time toggle if date is selected */}
                {props.dueDate && (
                  <div className="flex items-center justify-between px-1">
                    <p className="text-xs">Includes time</p>
                    <Switch
                      checked={props.dueDateIncludesTime}
                      onChange={(checked) =>
                        props.onDueDateIncludesTimeChanged(checked)
                      }
                      className={`inline-flex h-4 w-7 shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        props.dueDateIncludesTime
                          ? "bg-blue-500"
                          : "bg-neutral-300 dark:bg-neutral-700"
                      }`}
                    >
                      <span className="sr-only">Include time</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          props.dueDateIncludesTime
                            ? "translate-x-3"
                            : "translate-x-0"
                        } pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                )}
                {/*  show time picker if date is selected and includes time is true */}
                {props.dueDate && props.dueDateIncludesTime && (
                  <div className="flex items-center justify-between px-1">
                    <p className="text-xs">Time</p>
                    <input
                      className="w-1/2 bg-transparent py-1 text-right text-xs outline-none"
                      ref={timeInputRef}
                      value={timeValue}
                      onKeyDown={handleTimeKeyDown}
                      onChange={(e) => setTimeValue(e.target.value)}
                      onBlur={(e) => {
                        if (!props.dueDate) return;
                        const parseTime = parseTimeInputToDate(e.target.value);
                        if (!parseTime) {
                          setTimeValue(getTimeFromDate(props.dueDate));
                          toast.error("Invalid time");
                          return;
                        }
                        if (
                          parseTime.getHours() !== props.dueDate.getHours() ||
                          parseTime.getMinutes() !== props.dueDate.getMinutes()
                        ) {
                          props.onDueDateChanged(
                            new Date(
                              props.dueDate.getFullYear(),
                              props.dueDate.getMonth(),
                              props.dueDate.getDate(),
                              parseTime.getHours(),
                              parseTime.getMinutes(),
                            ),
                          );
                        } else {
                          setTimeValue(getTimeFromDate(props.dueDate));
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
