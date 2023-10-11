import { Menu, Transition } from "@headlessui/react";
import { useTheme } from "@taskbrew/hooks/use-theme";
import { Fragment } from "react";
import { IconDown } from "./icons";

export function ThemeMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-1 rounded-md p-2 text-sm transition-colors hover:bg-neutral-200 active:bg-neutral-300  dark:hover:bg-neutral-800 dark:active:bg-neutral-700">
        {theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System"}
        <IconDown className="h-3 w-3" />
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
        <Menu.Items className="absolute right-0 z-10 mt-1 w-32 origin-top-right overflow-scroll rounded-md bg-neutral-200 p-1 shadow-xl dark:bg-neutral-800">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${theme === "light" && "font-bold"} ${
                  active && "bg-neutral-300 dark:bg-neutral-700"
                } w-full rounded-md py-1 text-center text-sm transition-colors active:bg-neutral-400 dark:active:bg-neutral-600`}
                onClick={() => setTheme("light")}
              >
                Light
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${theme === "dark" && "font-bold"} ${
                  active && "bg-neutral-300 dark:bg-neutral-700"
                } w-full rounded-md py-1 text-center text-sm transition-colors active:bg-neutral-400 dark:active:bg-neutral-600`}
                onClick={() => setTheme("dark")}
              >
                Dark
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${theme === "system" && "font-bold"} ${
                  active && "bg-neutral-300 dark:bg-neutral-700"
                } w-full rounded-md py-1 text-center text-sm transition-colors active:bg-neutral-400 dark:active:bg-neutral-600`}
                onClick={() => setTheme("system")}
              >
                System
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
