import { Transition } from "@headlessui/react";
import { useState } from "react";

type Props = {
  icon: React.ReactNode;
  text: string;
  hideText?: boolean;
  className?: string;
  active?: boolean;
  onClick?: () => void;
};

export function SidebarButton(props: Props) {
  const [isButtonActive, setIsButtonActive] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={props.onClick}
        onMouseEnter={() => setIsButtonActive(true)}
        onMouseLeave={() => setIsButtonActive(false)}
        onFocus={() => setIsButtonActive(true)}
        onBlur={() => setIsButtonActive(false)}
        className={`flex w-full flex-row items-center justify-start gap-2 rounded-md p-2 transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 ${
          props.active && "bg-neutral-200 dark:bg-neutral-800"
        } ${props.hideText && "justify-center"} ${props.className}`}
      >
        {props.icon}
        <p className={`${props.hideText && "hidden"}`}>{props.text}</p>
      </button>
      <Transition
        show={props.hideText && isButtonActive}
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute -right-6 z-10 -translate-y-full translate-x-full rounded-md bg-neutral-300 p-2 shadow-md dark:bg-neutral-700">
          {props.text}
        </div>
      </Transition>
    </div>
  );
}
