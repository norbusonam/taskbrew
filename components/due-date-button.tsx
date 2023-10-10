import { Popover, Transition } from "@headlessui/react";
import { Task } from "@taskbrew/prisma/db";
import { Fragment, useState } from "react";
import { IconCalendar, IconLeft, IconRight } from "./icons";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type Props = {
  dueDate: Task["dueDate"];
  onDueDateClicked: (dueDate: Task["dueDate"]) => void;
};

const getNumberOfDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

const isToday = (date: Date) => {
  return date.toLocaleDateString() === new Date().toLocaleDateString();
};

const isTomorrow = (date: Date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.toLocaleDateString() === tomorrow.toLocaleDateString();
};

export function DueDateButton(props: Props) {
  const [selectedDate, setSelectedDate] = useState(props.dueDate);
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
    setSelectedDate(date);
    props.onDueDateClicked(date);
  };

  const onClear = () => {
    setSelectedDate(null);
    props.onDueDateClicked(null);
  };

  const onToday = () => {
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
  };

  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center gap-1 rounded-md px-1 outline-none transition-colors hover:bg-gray-200 active:bg-gray-300">
        <IconCalendar className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          {props.dueDate
            ? isToday(props.dueDate)
              ? "Today"
              : isTomorrow(props.dueDate)
              ? "Tomorrow"
              : props.dueDate.toLocaleDateString()
            : "No due date"}
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
        <Popover.Panel className="absolute z-10 mt-1 w-48 origin-top-left overflow-scroll rounded-md bg-gray-200 p-2 shadow-xl">
          <div className="space-y-1">
            {/* current month and year with next and previous buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevMonth}
                className="rounded-md p-1 transition-colors hover:bg-gray-300 active:bg-gray-400"
                aria-label="Previous month"
              >
                <IconLeft className="h-4 w-4" />
              </button>
              <p className="text-sm">
                {MONTHS[currentMonth]} {currentYear}
              </p>
              <button
                onClick={nextMonth}
                className="rounded-md p-1 transition-colors hover:bg-gray-300 active:bg-gray-400"
                aria-label="Next month"
              >
                <IconRight className="h-4 w-4" />
              </button>
            </div>
            {/* days of the week (header) */}
            <div className="grid grid-cols-7">
              {DAYS.map((day) => (
                <p key={day} className="text-center text-xs text-gray-500">
                  {day}
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
                      onDateSelected(new Date(currentYear, currentMonth, i + 1))
                    }
                    className={`${
                      // selected date styles
                      selectedDate &&
                      selectedDate.getDate() === i + 1 &&
                      selectedDate.getMonth() === currentMonth &&
                      selectedDate.getFullYear() === currentYear &&
                      "bg-gray-300 font-semibold"
                    } ${
                      // today styles
                      today.getDate() === i + 1 &&
                      today.getMonth() === currentMonth &&
                      today.getFullYear() === currentYear &&
                      "bg-red-400 text-white"
                    } aspect-square rounded-md p-1 text-center text-xs transition-colors hover:bg-gray-300 hover:text-black active:bg-gray-400`}
                  >
                    {i + 1}
                  </Popover.Button>
                ))}
            </div>
            {/* today and clear buttons */}
            <div className="flex justify-between">
              <button
                className="rounded-md p-1  text-center text-xs transition-colors hover:bg-gray-300 active:bg-gray-400"
                onClick={onToday}
              >
                Go to today
              </button>
              <Popover.Button
                className="rounded-md p-1 text-center text-xs transition-colors hover:bg-gray-300 active:bg-gray-400"
                onClick={onClear}
              >
                Clear
              </Popover.Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
