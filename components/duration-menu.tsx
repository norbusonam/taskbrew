import { Menu, Transition } from "@headlessui/react";
import { Task } from "@taskbrew/prisma/db";
import { Fragment } from "react";
import { IconClockCircle } from "./icons";

const DURATION_TO_TITLE: { [key: number]: string } = {
  0: "No duration",
  15: "15 min",
  30: "30 min",
  45: "45 min",
  60: "1 hour",
  90: "1.5 hours",
  120: "2 hours",
  180: "3 hours",
  240: "4 hours",
};

type Props = {
  duration: Task["duration"];
  onDurationClicked: (duration: Task["duration"]) => void;
};

export function DurationMenu(props: Props) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-1 rounded-md px-1 transition-colors hover:bg-neutral-200 active:bg-neutral-300  dark:hover:bg-neutral-800 dark:active:bg-neutral-700">
        <IconClockCircle className="h-4 w-4 text-neutral-500" />
        <span className="text-sm text-neutral-500">
          {props.duration && DURATION_TO_TITLE[props.duration]
            ? DURATION_TO_TITLE[props.duration]
            : "Set duration"}
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-1/2 z-10 mt-1 h-40 w-32 origin-top -translate-x-1/2 overflow-scroll rounded-md bg-neutral-200 p-1 shadow-xl dark:bg-neutral-800">
          {Object.keys(DURATION_TO_TITLE)
            .map(Number)
            .map((duration) => (
              <DurationButtonMenuItem
                key={duration}
                duration={duration}
                isCurrentDuration={props.duration === duration}
                onClick={() => props.onDurationClicked(duration)}
              />
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

type DurationButtonMenuItemProps = {
  duration: Task["duration"];
  isCurrentDuration: boolean;
  onClick: () => void;
};

function DurationButtonMenuItem(props: DurationButtonMenuItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${props.isCurrentDuration && "font-bold"} ${
            active && "bg-neutral-300 dark:bg-neutral-700"
          } w-full rounded-md py-1 text-center text-sm transition-colors active:bg-neutral-400 dark:active:bg-neutral-600`}
          onClick={props.onClick}
        >
          {props.duration && DURATION_TO_TITLE[props.duration]
            ? DURATION_TO_TITLE[props.duration]
            : "No duration"}
        </button>
      )}
    </Menu.Item>
  );
}
