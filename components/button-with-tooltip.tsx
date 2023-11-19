import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  OffsetOptions,
  Placement,
  offset,
  useFloating,
} from "@floating-ui/react-dom";
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type Props = {
  children: React.ReactNode;
  tooltip: string;
  placement: Placement;
  disableTooltip?: boolean;
  className?: string;
  offset?: OffsetOptions;
  draggableListeners?: SyntheticListenerMap;
  onClick?: () => void;
};

export function ButtonWithTooltip(props: Props) {
  const [isActive, setIsActive] = useState(false);
  const { refs, floatingStyles } = useFloating({
    open: isActive,
    placement: props.placement,
    middleware: [offset(props.offset ?? { mainAxis: 4 })],
  });

  return (
    <>
      <button
        {...props.draggableListeners}
        className={props.className}
        ref={refs.setReference}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onClick={props.onClick}
      >
        {props.children}
      </button>
      <Transition
        as={Fragment}
        show={!props.disableTooltip && isActive}
        leave="transition-opacity"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          ref={refs.setFloating}
          role="tooltip"
          className="z-10 rounded-md bg-neutral-300 px-2 py-1 text-sm shadow-md dark:bg-neutral-700"
          style={floatingStyles}
        >
          {props.tooltip}
        </div>
      </Transition>
    </>
  );
}
