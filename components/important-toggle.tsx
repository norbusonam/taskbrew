import { Transition } from "@headlessui/react";
import { useState } from "react";
import { IconFlag, IconFlagFilled } from "./icons";

type Props = {
  isImportant: boolean;
  onIsImportantChanged: (isImportant: boolean) => void;
};

export function ImportantToggle(props: Props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className="flex items-center rounded-md px-1 transition-colors hover:bg-neutral-200 active:bg-neutral-300  dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
        onClick={() => props.onIsImportantChanged(!props.isImportant)}
      >
        {props.isImportant ? (
          <IconFlagFilled className="h-4 w-4 text-yellow-500" />
        ) : (
          <IconFlag className="h-4 w-4 text-neutral-500" />
        )}
      </button>
      <Transition
        show={isActive}
        leave="transition-opacity"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute z-10 -translate-x-7 -translate-y-8 rounded-md bg-neutral-300 px-2 py-1 text-sm shadow-md dark:bg-neutral-700">
          {props.isImportant ? "Flagged" : "Not flagged"}
        </div>
      </Transition>
    </>
  );
}
